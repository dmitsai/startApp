import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import { createProjectSchema, updateProjectSchema } from "./schemas";

export const projectsRouter = createTRPCRouter({
	/**
	 * Создание проекта
	 */
	create: protectedProcedure
		.meta({ description: "Создание нового проекта. Создатель автоматически становится участником проекта с ролью Creator." })
		.input(createProjectSchema)
		.mutation(async ({ input, ctx }) => {
			const { technologies, ...projectData } = input;

			// Создание проекта
			const project = await ctx.db.project.create({
				data: {
					...projectData,
					creatorId: ctx.session.user.id,
					currentTeamSize: 1, // Создатель автоматически участник
					technologies: technologies
						? {
								create: technologies.map((tech) => ({
									technologyId: tech.technologyId,
									required: tech.required,
									minGrade: tech.minGrade,
								})),
							}
						: undefined,
				},
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
					technologies: {
						include: {
							technology: {
								select: {
									id: true,
									name: true,
									category: true,
									icon: true,
								},
							},
						},
					},
				},
			});

			// Автоматически добавляем создателя в участники
			await ctx.db.projectMember.create({
				data: {
					projectId: project.id,
					userId: ctx.session.user.id,
					role: "Creator",
				},
			});

			return {
				project,
				message: "Проект успешно создан",
			};
		}),

	/**
	 * Получение проекта по ID
	 */
	getById: publicProcedure
		.meta({ description: "Получение полной информации о проекте по его ID, включая создателя, технологии, участников и количество заявок." })
		.input(z.object({ projectId: z.string().describe("ID проекта") }))
		.query(async ({ input, ctx }) => {
			const project = await ctx.db.project.findUnique({
				where: { id: input.projectId },
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							image: true,
							role: true,
							location: true,
						},
					},
					technologies: {
						include: {
							technology: {
								select: {
									id: true,
									name: true,
									category: true,
									icon: true,
								},
							},
						},
					},
					rolesList: true,
					members: {
						include: {
							user: {
								select: {
									id: true,
									name: true,
									image: true,
									role: true,
								},
							},
						},
					},
					_count: {
						select: {
							applications: true,
							members: true,
						},
					},
				},
			});

			if (!project) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Проект не найден",
				});
			}

			return project;
		}),

	/**
	 * Получение списка проектов
	 */
	getAll: publicProcedure
		.meta({ description: "Получение списка проектов с фильтрацией по типу, статусу и поиском по названию/описанию. Поддерживает пагинацию через cursor." })
		.input(
			z
				.object({
					type: z.enum(["EDUCATIONAL", "COMMERCIAL"]).optional().describe("Фильтр по типу проекта"),
					status: z
						.enum(["DRAFT", "OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED"])
						.optional()
						.describe("Фильтр по статусу проекта"),
					search: z.string().optional().describe("Поисковый запрос (поиск по названию и описанию)"),
					limit: z.number().int().min(1).max(100).default(20).describe("Количество проектов на странице (1-100)"),
					cursor: z.string().optional().describe("Курсор для пагинации (ID последнего проекта на предыдущей странице)"),
				})
				.optional(),
		)
		.query(async ({ input, ctx }) => {
			const limit = input?.limit ?? 20;
			const cursor = input?.cursor;

			const where = {
				...(input?.type && { type: input.type }),
				...(input?.status && { status: input.status }),
				...(input?.search && {
					OR: [
						{ title: { contains: input.search, mode: "insensitive" as const } },
						{
							description: {
								contains: input.search,
								mode: "insensitive" as const,
							},
						},
					],
				}),
			};

			const projects = await ctx.db.project.findMany({
				where,
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
				orderBy: { createdAt: "desc" },
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
					technologies: {
						include: {
							technology: {
								select: {
									id: true,
									name: true,
									category: true,
								},
							},
						},
					},
					_count: {
						select: {
							applications: true,
							members: true,
						},
					},
				},
			});

			let nextCursor: string | undefined = undefined;
			if (projects.length > limit) {
				const nextItem = projects.pop();
				nextCursor = nextItem?.id;
			}

			return {
				projects,
				nextCursor,
			};
		}),

	/**
	 * Получение проектов текущего пользователя
	 */
	getMyProjects: protectedProcedure
		.meta({ description: "Получение всех проектов, созданных текущим пользователем. Можно фильтровать по статусу." })
		.input(
			z
				.object({
					status: z
						.enum(["DRAFT", "OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED"])
						.optional()
						.describe("Фильтр по статусу проекта"),
					limit: z.number().int().min(1).max(100).default(20).describe("Количество проектов (1-100)"),
				})
				.optional(),
		)
		.query(async ({ input, ctx }) => {
			const projects = await ctx.db.project.findMany({
				where: {
					creatorId: ctx.session.user.id,
					...(input?.status && { status: input.status }),
				},
				take: input?.limit ?? 20,
				orderBy: { createdAt: "desc" },
				include: {
					technologies: {
						include: {
							technology: {
								select: {
									id: true,
									name: true,
									category: true,
								},
							},
						},
					},
					_count: {
						select: {
							applications: true,
							members: true,
						},
					},
				},
			});

			return projects;
		}),

	/**
	 * Обновление проекта (только создатель)
	 */
	update: protectedProcedure
		.meta({ description: "Обновление проекта. Доступно только создателю проекта. Все поля опциональны - обновляются только переданные значения." })
		.input(updateProjectSchema)
		.mutation(async ({ input, ctx }) => {
			const { projectId, ...updateData } = input;

			// Проверка прав (только создатель может обновлять)
			const project = await ctx.db.project.findUnique({
				where: { id: projectId },
				select: { creatorId: true },
			});

			if (!project) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Проект не найден",
				});
			}

			if (project.creatorId !== ctx.session.user.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Вы не являетесь создателем этого проекта",
				});
			}

			// Фильтруем только переданные поля
			const filteredData: Record<string, unknown> = {};
			Object.entries(updateData).forEach(([key, value]) => {
				if (value !== undefined) {
					filteredData[key] = value;
				}
			});

			const updatedProject = await ctx.db.project.update({
				where: { id: projectId },
				data: filteredData,
				include: {
					creator: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
					technologies: {
						include: {
							technology: {
								select: {
									id: true,
									name: true,
									category: true,
								},
							},
						},
					},
				},
			});

			return {
				project: updatedProject,
				message: "Проект успешно обновлен",
			};
		}),
});


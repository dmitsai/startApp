import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { updateProfileSchema } from "./schemas";

export const profileRouter = createTRPCRouter({
	/**
	 * Получение профиля текущего пользователя
	 */
	get: protectedProcedure
		.meta({ description: "Получение полного профиля текущего авторизованного пользователя, включая технологии и количество заявок." })
		.query(async ({ ctx }) => {
		const user = await ctx.db.user.findUnique({
			where: { id: ctx.session.user.id },
			select: {
				id: true,
				email: true,
				name: true,
				image: true,
				bio: true,
				cvUrl: true,
				role: true,
				location: true,
				createdAt: true,
				updatedAt: true,
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
				_count: {
					select: {
						applications: true,
					},
				},
			},
		});

		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Пользователь не найден",
			});
		}

		return user;
	}),

	/**
	 * Обновление профиля (выборочное)
	 */
	update: protectedProcedure
		.meta({ description: "Обновление профиля текущего пользователя. Все поля опциональны - обновляются только переданные значения." })
		.input(updateProfileSchema)
		.mutation(async ({ input, ctx }) => {
			// Фильтруем только переданные поля
			const updateData: Record<string, unknown> = {};

			if (input.name !== undefined) updateData.name = input.name;
			if (input.bio !== undefined) updateData.bio = input.bio;
			if (input.cvUrl !== undefined)
				updateData.cvUrl = input.cvUrl || null;
			if (input.role !== undefined) updateData.role = input.role;
			if (input.location !== undefined) updateData.location = input.location;
			if (input.image !== undefined) updateData.image = input.image || null;

			const user = await ctx.db.user.update({
				where: { id: ctx.session.user.id },
				data: updateData,
				select: {
					id: true,
					email: true,
					name: true,
					image: true,
					bio: true,
					cvUrl: true,
					role: true,
					location: true,
					updatedAt: true,
				},
			});

			return {
				user,
				message: "Профиль успешно обновлен",
			};
		}),

	/**
	 * Получение профиля по ID (публичный)
	 */
	getById: protectedProcedure
		.meta({ description: "Получение публичного профиля пользователя по его ID. Включает базовую информацию и технологии." })
		.input(z.object({ userId: z.string().describe("ID пользователя для получения профиля") }))
		.query(async ({ input, ctx }) => {
			const user = await ctx.db.user.findUnique({
				where: { id: input.userId },
				select: {
					id: true,
					name: true,
					image: true,
					bio: true,
					role: true,
					location: true,
					createdAt: true,
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

			if (!user) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Пользователь не найден",
				});
			}

			return user;
		}),
});


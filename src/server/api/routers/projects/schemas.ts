import { z } from "zod";

/**
 * Enum для типа проекта
 */
export const projectTypeEnum = z.enum(["EDUCATIONAL", "COMMERCIAL"]);

/**
 * Enum для статуса проекта
 */
export const projectStatusEnum = z.enum([
	"DRAFT",
	"OPEN",
	"IN_PROGRESS",
	"COMPLETED",
	"CLOSED",
]);

/**
 * Схема для создания проекта
 */
export const createProjectSchema = z.object({
	title: z.string().min(3, "Название должно быть не менее 3 символов").describe("Название проекта"),
	description: z.string().min(10, "Описание должно быть не менее 10 символов").describe("Подробное описание проекта"),
	goals: z.string().optional().describe("Цели проекта"),
	tasks: z.string().optional().describe("Задачи проекта"),
	type: projectTypeEnum.describe("Тип проекта: EDUCATIONAL (учебный) или COMMERCIAL (коммерческий)"),
	roles: z.string().optional().describe("Описание ролей в команде"),
	requirements: z.string().optional().describe("Требования к участникам"),
	contacts: z.string().optional().describe("Контактная информация"),
	timeline: z.string().optional().describe("Временные рамки проекта"),
	teamSize: z.number().int().min(1).max(50).default(1).describe("Размер команды (от 1 до 50 человек)"),
	technologies: z
		.array(
			z.object({
				technologyId: z.string().describe("ID технологии"),
				required: z.boolean().default(true).describe("Обязательна ли технология для проекта"),
				minGrade: z.number().int().min(0).max(10).optional().describe("Минимальный уровень владения технологией (0-10)"),
			}),
		)
		.optional()
		.describe("Список технологий, используемых в проекте"),
});

/**
 * Схема для обновления проекта
 */
export const updateProjectSchema = z.object({
	projectId: z.string().describe("ID проекта для обновления"),
	title: z.string().min(3).optional().describe("Название проекта"),
	description: z.string().min(10).optional().describe("Описание проекта"),
	goals: z.string().optional().describe("Цели проекта"),
	tasks: z.string().optional().describe("Задачи проекта"),
	type: projectTypeEnum.optional().describe("Тип проекта: EDUCATIONAL или COMMERCIAL"),
	status: projectStatusEnum.optional().describe("Статус проекта: DRAFT, OPEN, IN_PROGRESS, COMPLETED, CLOSED"),
	roles: z.string().optional().describe("Описание ролей в команде"),
	requirements: z.string().optional().describe("Требования к участникам"),
	contacts: z.string().optional().describe("Контактная информация"),
	timeline: z.string().optional().describe("Временные рамки проекта"),
	teamSize: z.number().int().min(1).max(50).optional().describe("Размер команды (от 1 до 50 человек)"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;


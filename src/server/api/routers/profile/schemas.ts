import { z } from "zod";

/**
 * Схема для обновления профиля (все поля опциональны)
 */
export const updateProfileSchema = z.object({
	name: z.string().min(2, "Имя должно быть не менее 2 символов").optional().describe("Имя пользователя"),
	bio: z.string().max(500, "Биография не должна превышать 500 символов").optional().describe("Краткая биография пользователя (до 500 символов)"),
	cvUrl: z.string().url("Некорректный URL").optional().or(z.literal("")).describe("URL ссылка на резюме (CV)"),
	role: z.string().max(100, "Роль не должна превышать 100 символов").optional().describe("Роль/должность пользователя"),
	location: z.string().max(100, "Локация не должна превышать 100 символов").optional().describe("Местоположение пользователя"),
	image: z.string().url("Некорректный URL").optional().or(z.literal("")).describe("URL аватара пользователя"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;


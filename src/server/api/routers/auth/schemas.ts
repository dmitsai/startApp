import { z } from "zod";

/**
 * Схема для регистрации
 */
export const registerSchema = z.object({
	email: z.string().email("Некорректный email").describe("Email адрес пользователя"),
	password: z.string().min(8, "Пароль должен быть не менее 8 символов").describe("Пароль (минимум 8 символов)"),
	name: z.string().min(2, "Имя должно быть не менее 2 символов").optional().describe("Имя пользователя (опционально)"),
});

/**
 * Схема для авторизации
 */
export const loginSchema = z.object({
	email: z.string().email("Некорректный email").describe("Email адрес пользователя"),
	password: z.string().min(1, "Пароль обязателен").describe("Пароль пользователя"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;


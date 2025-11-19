import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import { registerSchema, loginSchema } from "./schemas";
import { hashPassword, verifyPassword } from "@/shared/lib/password";

export const authRouter = createTRPCRouter({
	/**
	 * Регистрация нового пользователя
	 */
	register: publicProcedure
		.meta({ description: "Регистрация нового пользователя в системе. Создает новый аккаунт с указанным email и паролем." })
		.input(registerSchema)
		.mutation(async ({ input, ctx }) => {
			const { email, password, name } = input;

			// Проверка существования пользователя
			const existingUser = await ctx.db.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Пользователь с таким email уже существует",
				});
			}

			// Хеширование пароля
			const hashedPassword = await hashPassword(password);

			// Создание пользователя
			const user = await ctx.db.user.create({
				data: {
					email,
					password: hashedPassword,
					name: name ?? null,
				},
				select: {
					id: true,
					email: true,
					name: true,
					image: true,
				},
			});

			return {
				user,
				message: "Пользователь успешно зарегистрирован",
			};
		}),

	/**
	 * Авторизация пользователя
	 */
	login: publicProcedure
		.meta({ description: "Авторизация пользователя по email и паролю. Возвращает данные пользователя при успешной авторизации." })
		.input(loginSchema)
		.mutation(async ({ input, ctx }) => {
			const { email, password } = input;

			// Поиск пользователя
			const user = await ctx.db.user.findUnique({
				where: { email },
			});

			if (!user || !user.password) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Неверный email или пароль",
				});
			}

			// Проверка пароля
			const isValidPassword = await verifyPassword(password, user.password);

			if (!isValidPassword) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Неверный email или пароль",
				});
			}

			// Возвращаем данные пользователя
			// Сессия будет создана на клиенте через NextAuth
			return {
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
				},
				message: "Успешная авторизация",
			};
		}),

	/**
	 * Получение текущего пользователя
	 */
	me: publicProcedure
		.meta({ description: "Получение данных текущего авторизованного пользователя. Возвращает null, если пользователь не авторизован." })
		.query(async ({ ctx }) => {
		if (!ctx.session?.user) {
			return null;
		}

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
			},
		});

		return user;
	}),
});


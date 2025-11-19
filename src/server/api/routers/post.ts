import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.meta({ description: "Тестовая процедура для проверки работы API. Возвращает приветствие с переданным текстом." })
		.input(z.object({ text: z.string().describe("Текст для приветствия") }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: protectedProcedure
		.meta({ description: "Создание нового поста. Требует авторизации." })
		.input(z.object({ name: z.string().min(1).describe("Название поста") }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.post.create({
				data: {
					name: input.name,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getLatest: protectedProcedure
		.meta({ description: "Получение последнего поста текущего пользователя. Возвращает null, если постов нет." })
		.query(async ({ ctx }) => {
			const post = await ctx.db.post.findFirst({
				orderBy: { createdAt: "desc" },
				where: { createdBy: { id: ctx.session.user.id } },
			});

			return post ?? null;
		}),

	getSecretMessage: protectedProcedure
		.meta({ description: "Получение секретного сообщения. Доступно только авторизованным пользователям." })
		.query(() => {
			return "you can now see this secret message!";
		}),
});

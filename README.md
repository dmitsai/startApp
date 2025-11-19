# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## 🚀 Quick Start

### 1. Запуск базы данных

**На Windows:**
1. Убедитесь, что Docker Desktop установлен и запущен
2. Запустите скрипт:
   ```powershell
   .\start-database.ps1
   ```

**Или вручную через Docker:**
```bash
docker run -d --name start-app-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=start-app -p 5432:5432 postgres:latest
```

**На Linux/macOS:**
```bash
./start-database.sh
```

### 2. Применение миграций

```bash
npm run db:push
# или
npm run db:generate
```

### 3. Запуск приложения

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`
API документация (trpc-ui) доступна на `http://localhost:3000/api/panel` (только в режиме разработки)

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

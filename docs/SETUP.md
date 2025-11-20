# Инструкция по настройке проекта

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm или yarn или pnpm
- PostgreSQL (локально или облачная БД)

### Инициализация T3 проекта

```bash
# Создание проекта с T3 Stack
npx create-t3-app@latest startapp

# Или с использованием pnpm
pnpm create t3-app@latest startapp
```

### Установка зависимостей

```bash
npm install
# или
pnpm install
```

### Настройка базы данных

1. Создайте файл `.env` на основе `.env.example`
2. Укажите `DATABASE_URL` для подключения к PostgreSQL
3. Запустите миграции Prisma:

```bash
npx prisma migrate dev
```

### Установка Animate UI

Следуйте инструкциям на [animate-ui.com](https://animate-ui.com/docs/installation):

```bash
# Инициализация shadcn/ui (если еще не инициализирован)
npx shadcn-ui@latest init

# Добавление компонентов Animate UI
npx shadcn-ui@latest add [component-name]
```

### Запуск проекта

```bash
# Development режим
npm run dev

# Production build
npm run build
npm start
```

## 📦 Основные зависимости

### Уже включены в T3 Stack:
- `next` - Next.js фреймворк
- `@trpc/server` - tRPC сервер
- `@trpc/client` - tRPC клиент
- `@trpc/react-query` - React Query интеграция
- `@prisma/client` - Prisma клиент
- `prisma` - Prisma CLI
- `typescript` - TypeScript

### Дополнительные зависимости:
- `@tanstack/react-query` - React Query
- `react-hook-form` - Управление формами
- `@hookform/resolvers` - Валидация форм (zod)
- `zod` - Схемы валидации
- `tailwindcss` - Tailwind CSS
- `animate-ui` - UI компоненты с анимациями

## 🗄️ Структура базы данных

Схема Prisma будет определена в `prisma/schema.prisma`. Основные сущности:
- User (пользователи)
- Project (проекты)
- Application (отклики)
- TechnologyTag (теги технологий)
- UserTechnology (связь пользователь-технология с грейдом)

## 🔧 Настройка окружения

Создайте `.env` файл:

```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/startapp"

# NextAuth (для аутентификации)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Другие переменные окружения
```

## 📚 Полезные ссылки

- [T3 Stack документация](https://create.t3.gg/)
- [Next.js документация](https://nextjs.org/docs)
- [tRPC документация](https://trpc.io/)
- [Prisma документация](https://www.prisma.io/docs)
- [Animate UI документация](https://animate-ui.com/docs/installation)
- [React Query документация](https://tanstack.com/query/latest)
- [React Hook Form документация](https://react-hook-form.com/)


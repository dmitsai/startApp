# 📦 Shared Layer (FSD)

Слой переиспользуемых ресурсов, которые используются в разных частях приложения.

## Структура

```
shared/
├── ui/          # UI компоненты (переиспользуемые)
├── lib/         # Утилиты и хелперы
├── api/         # API клиенты (если нужны)
└── config/      # Конфигурация
```

## UI компоненты

Все UI компоненты находятся в `shared/ui/`:

### Базовые компоненты (shadcn/ui)
- `button.tsx` - кнопки
- `input.tsx` - поля ввода
- `textarea.tsx` - многострочные поля
- `card.tsx` - карточки
- `badge.tsx` - бейджи
- `avatar.tsx` - аватары
- `dialog.tsx` - модальные окна
- `tabs.tsx` - вкладки
- `select.tsx` - выпадающие списки
- `tooltip.tsx` - подсказки
- `separator.tsx` - разделители
- `skeleton.tsx` - загрузочные placeholder'ы
- `alert.tsx` - уведомления
- `label.tsx` - метки
- `slider.tsx` - слайдеры
- `progress.tsx` - прогресс-бары

### Кастомные компоненты StartApp
- `technology-tag.tsx` - теги технологий с грейдами
- `grade-slider.tsx` - слайдер для выбора уровня знаний
- `profile-card.tsx` - карточка профиля пользователя
- `project-card.tsx` - карточка проекта
- `application-card.tsx` - карточка отклика
- `match-score.tsx` - оценка соответствия
- `search-bar.tsx` - поиск с фильтрами

## Импорт

```tsx
// UI компоненты
import { Button } from "@/shared/ui/button";
import { TechnologyTag } from "@/shared/ui/technology-tag";

// Утилиты
import { cn } from "@/shared/lib/utils";
```

## Правила

1. ✅ Компоненты должны быть переиспользуемыми
2. ✅ Не должны содержать бизнес-логику
3. ✅ Должны быть типобезопасными
4. ✅ Должны следовать дизайн-системе проекта


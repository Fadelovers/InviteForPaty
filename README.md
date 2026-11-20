# Прехевиль — приглашение на Фестиваль Термины

React + Vite страница-приглашение для игроков. Публикуется на GitHub Pages как статический сайт.

## Локальный запуск

```
npm install
npm run dev
```

## Публикация на GitHub Pages

1. Создай репозиторий на GitHub (например, `prehevil-invite`) и загрузи туда всё содержимое этой папки, кроме `node_modules` и `dist`.
2. В репозитории: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Запуш изменения в ветку `main` — workflow `.github/workflows/deploy.yml` сам соберёт сайт и выложит его.
4. Сайт будет доступен по адресу `https://<имя-аккаунта>.github.io/<имя-репозитория>/`.

Пересборка происходит автоматически при каждом пуше в `main`.

## Где править данные игры

- Дата, время и место встречи — `src/components/Ticket.jsx` (ищи комментарии `ЗАМЕНИТЕ`).
- Текст письма Пер'келе — `src/components/Letter.jsx`.
- Условия фестиваля — `src/components/Rules.jsx`.
- Вопросы анкеты и стартовые предметы — `src/components/Registration.jsx` (массив `QUESTIONS`).

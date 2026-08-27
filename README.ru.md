[English](README.md) | [Español](README.es.md) | Русский

# Resize Checker

## Назначение

Resize Checker показывает URL или переданный HTML в выбранных ширинах viewport для проверки адаптивной вёрстки.

## Веб-адрес

<https://resize-checker.d9911.org/>

## Подтверждённые возможности

- Выбирает предустановленные ширины 320, 375, 425, 768, 1024 или 1440 пикселей либо вводит произвольную положительную ширину; поле произвольной ширины задаёт диапазон интерфейса 100–3000.
- Принимает URL или HTML. URL назначается iframe предпросмотра, а переданный HTML — через `srcdoc`.
- Загружает содержимое кнопкой или Ctrl/Cmd+Enter в поле ввода.
- Использует отложенно загружаемый iframe предпросмотра с sandbox-токенами `allow-scripts allow-forms`.
- Переключает интерфейс между русским, английским и испанским и хранит выбранные язык и тему в браузерном `localStorage`.
- Содержит web manifest и иконки приложения. В репозитории не найдена регистрация service worker, поэтому README не заявляет работу без сети или установку приложения.

## Использование

1. Выберите предустановленную ширину viewport или введите произвольную ширину.
2. Вставьте URL или HTML в исходное поле.
3. Нажмите **Загрузить** либо Ctrl/Cmd+Enter, чтобы обновить предпросмотр.

## Локальная разработка и сборка

`package.json` определяет следующие скрипты; README не заявляет об успешной установке или сборке:

```bash
npm run dev               # сервер разработки Vite (настроен на порт 3000)
npm run build             # очистка, компиляция TypeScript и Sass
npm run build:standalone  # production-сборка Vite
npm run build:single      # сборка Vite, затем src/build-standalone.js
npm run preview           # предпросмотр Vite
npm run lint              # ESLint для src/**/*.ts
```

В репозитории отслеживаются и `package-lock.json`, и `yarn.lock`, но в `package.json` нет поля `packageManager`. Lockfile неэквивалентны: package lock, например, фиксирует Vite `^6.3.5` и TypeScript `^5.1.3`, тогда как `package.json` объявляет Vite `^8.2.2` и TypeScript `^6.0.3`, а Yarn lock содержит записи для этих последних диапазонов. Выберите и согласуйте политику package manager/lockfile, прежде чем считать установку воспроизводимой; не смешивайте lockfile.

## Структура

- `src/index.html` — входной документ Vite; `src/main.ts` импортирует стили и логику приложения из `src/index.ts`.
- `src/styles.scss` и `src/d9911-theme.css` определяют стили.
- `vite.config.ts` задаёт `src` в качестве корня Vite, открывает `public/` и записывает сборки в `dist/`.
- `public/` содержит manifest и иконки; `src/build-standalone.js` встраивает результат Vite в корневой `index.html` для скрипта `build:single`.

## Технологии и runtime-зависимости

Приложение использует браузерные HTML, CSS, JavaScript, iframe, `localStorage` и Web App Manifest API. Конфигурация проекта использует TypeScript, Sass, Vite, ESLint и Prettier; `package.json` также объявляет зависимость `fs` 0.0.2. В отслеживаемом исходном коде приложение не регистрирует service worker.

## Лицензия

Для документации авторитетным источником является файл [LICENSE](LICENSE) репозитория: он содержит текст GPLv3 и дополнительные условия проекта. В `package.json` также указано поле лицензии `MIT`; README не интерпретирует и не согласует это противоречие.

## Автор

Уведомление о copyright в репозитории указывает Denis Gutsuliak (`d9911.org`), 2024–2025.

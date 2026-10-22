[English](README.md) | [Español](README.es.md) | Русский

# Resize Checker

## Назначение

Resize Checker показывает URL или переданный HTML в выбранных ширинах viewport для проверки адаптивной вёрстки.

## Веб-адрес

<https://resize-checker.d9911.org/>

## Подтверждённые возможности

- Выбирает предустановленные ширины 320, 375, 425, 768, 1024 или 1440 пикселей либо вводит произвольную целую ширину от 100 до 3000 пикселей.
- Принимает HTTP(S) URL или HTML. При переключении между URL и HTML предыдущий источник iframe очищается.
- Загружает содержимое кнопкой или Ctrl/Cmd+Enter в поле ввода.
- Использует отложенно загружаемый iframe предпросмотра с sandbox-токенами `allow-scripts allow-forms`.
- Переключает интерфейс между русским, английским и испанским и хранит выбранные язык и тему в браузерном `localStorage`.
- Содержит web manifest и иконки приложения. В репозитории не найдена регистрация service worker, поэтому README не заявляет работу без сети или установку приложения.

## Использование

1. Выберите предустановленную ширину viewport или введите произвольную ширину.
2. Вставьте URL или HTML в исходное поле.
3. Нажмите **Загрузить** либо Ctrl/Cmd+Enter, чтобы обновить предпросмотр.

## Локальная разработка и сборка

Используйте Node.js 22.13+ (ветка 22.x) или 24+ и npm. При использовании nvm выполните `nvm install` и `nvm use` в папке проекта.

```bash
npm ci                    # установка версий из package-lock.json
npm run check             # проверка TypeScript без генерации файлов
npm run dev               # сервер разработки Vite (настроен на порт 3000)
npm run build             # проверка типов и production-сборка Vite
npm run build:standalone  # production-сборка Vite
npm run build:single      # сборка Vite, затем src/build-standalone.js
npm run preview           # предпросмотр Vite
npm test                  # регрессионные тесты автономной сборки
npm run lint              # ESLint для кода приложения, скриптов и тестов
```

Используйте npm и отслеживаемый `package-lock.json` как единственный lock-файл. TypeScript оставлен на 6.0: установленный typescript-eslint поддерживает версии ниже 6.1. `make build` и `make build-single` вызывают те же npm-скрипты. `npm run preview` обслуживает `dist/`; `npm run build:single` также обновляет корневой `index.html` со встроенными JavaScript и CSS.

## Структура

- `src/index.html` — входной документ Vite; `src/main.ts` импортирует стили и логику приложения из `src/index.ts`.
- `src/styles.scss` и `src/d9911-theme.css` определяют стили.
- `vite.config.ts` задаёт `src` в качестве корня Vite, открывает `public/` и записывает сборки в `dist/`.
- `public/` содержит manifest и иконки; `src/build-standalone.js` встраивает результат Vite в корневой `index.html` для скрипта `build:single`.

## Технологии и runtime-зависимости

Приложение использует браузерные HTML, CSS, JavaScript, iframe, `localStorage` и Web App Manifest API. Конфигурация проекта использует TypeScript, Sass, Vite, ESLint и Prettier. Runtime-зависимостей npm нет. В отслеживаемом исходном коде приложение не регистрирует service worker.

## Лицензия

Для документации авторитетным источником является файл [LICENSE](LICENSE) репозитория: он содержит текст GPLv3 и дополнительные условия проекта.

## Автор

Уведомление о copyright в репозитории указывает Denis Gutsuliak (`d9911.org`), 2024–2025.

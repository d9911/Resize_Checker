English | [Español](README.es.md) | [Русский](README.ru.md)

# Resize Checker

## Purpose

Resize Checker previews a URL or supplied HTML at selected viewport widths for responsive-layout checks.

## Web address

<https://resize-checker.d9911.org/>

## Verified capabilities

- Select preset widths of 320, 375, 425, 768, 1024, or 1440 pixels, or enter a custom integer width from 100 to 3000 pixels.
- Paste an HTTP(S) URL or HTML. Switching between URLs and HTML clears the previous iframe source.
- Load content with the button or with Ctrl/Cmd+Enter in the input.
- Use a lazy-loaded preview iframe with `allow-scripts allow-forms` sandbox tokens.
- Switch the interface between Russian, English, and Spanish, and save the selected language and theme in browser `localStorage`.
- Include a web manifest and app icons. No service-worker registration is tracked in the repository, so this README makes no offline or installation claim.

## Usage

1. Choose a preset viewport width or enter a custom width.
2. Paste a URL or HTML into the source field.
3. Select **Load** or press Ctrl/Cmd+Enter to update the preview.

## Local development and build

Use Node.js 22.13+ (22.x) or 24+, and npm. With nvm, run `nvm install` and `nvm use` in the repository.

```bash
npm ci                    # install the versions in package-lock.json
npm run check             # TypeScript without emitting files
npm run dev               # Vite development server (configured for port 3000)
npm run build             # type-check and Vite production build
npm run build:standalone  # Vite production build
npm run build:single      # Vite build, then src/build-standalone.js
npm run preview           # Vite preview
npm test                  # regression tests for standalone output
npm run lint              # ESLint for application code, scripts and tests
```

Use npm and the tracked `package-lock.json` as the single lockfile. TypeScript remains on 6.0 because the installed typescript-eslint parser supports versions below 6.1. `make build` and `make build-single` call the same npm scripts. `npm run preview` serves `dist/`; `npm run build:single` also refreshes the root `index.html` with embedded JavaScript and CSS.

## Structure

- `src/index.html` is the Vite entry document; `src/main.ts` imports the styles and application logic in `src/index.ts`.
- `src/styles.scss` and `src/d9911-theme.css` define the styles.
- `vite.config.ts` sets `src` as the Vite root, exposes `public/`, and writes builds to `dist/`.
- `public/` contains the manifest and icons; `src/build-standalone.js` embeds Vite output into the root `index.html` for the `build:single` script.

## Technologies and runtime dependencies

The app uses browser HTML, CSS, JavaScript, iframe, `localStorage`, and Web App Manifest APIs. The project configuration uses TypeScript, Sass, Vite, ESLint, and Prettier. There are no npm runtime dependencies. The application has no registered service worker in the tracked source.

## License

For documentation, the repository [LICENSE](LICENSE) file is authoritative: it contains GPLv3 text and additional project-specific terms.

## Author

The repository copyright notice identifies Denis Gutsuliak (`d9911.org`), 2024–2025.

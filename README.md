English | [Español](README.es.md) | [Русский](README.ru.md)

# Resize Checker

## Purpose

Resize Checker previews a URL or supplied HTML at selected viewport widths for responsive-layout checks.

## Web address

<https://resize-checker.d9911.org/>

## Verified capabilities

- Select preset widths of 320, 375, 425, 768, 1024, or 1440 pixels, or enter a custom positive width; the custom input exposes 100–3000 as its UI range.
- Paste a URL or HTML. URLs are assigned to the preview iframe; supplied HTML is assigned with `srcdoc`.
- Load content with the button or with Ctrl/Cmd+Enter in the input.
- Use a lazy-loaded preview iframe with `allow-scripts allow-forms` sandbox tokens.
- Switch the interface between Russian, English, and Spanish, and save the selected language and theme in browser `localStorage`.
- Include a web manifest and app icons. No service-worker registration is tracked in the repository, so this README makes no offline or installation claim.

## Usage

1. Choose a preset viewport width or enter a custom width.
2. Paste a URL or HTML into the source field.
3. Select **Load** or press Ctrl/Cmd+Enter to update the preview.

## Local development and build

`package.json` defines the following scripts; no successful installation or build is asserted here:

```bash
npm run dev               # Vite development server (configured for port 3000)
npm run build             # clean, TypeScript compilation, and Sass compilation
npm run build:standalone  # Vite production build
npm run build:single      # Vite build, then src/build-standalone.js
npm run preview           # Vite preview
npm run lint              # ESLint for src/**/*.ts
```

The repository tracks both `package-lock.json` and `yarn.lock`, but `package.json` has no `packageManager` field. The lockfiles are not equivalent: the package lock records, for example, Vite `^6.3.5` and TypeScript `^5.1.3`, while `package.json` declares Vite `^8.2.2` and TypeScript `^6.0.3`, and the Yarn lock has entries for the latter ranges. Select and reconcile a package-manager/lockfile policy before treating an install as reproducible; do not mix the lockfiles.

## Structure

- `src/index.html` is the Vite entry document; `src/main.ts` imports the styles and application logic in `src/index.ts`.
- `src/styles.scss` and `src/d9911-theme.css` define the styles.
- `vite.config.ts` sets `src` as the Vite root, exposes `public/`, and writes builds to `dist/`.
- `public/` contains the manifest and icons; `src/build-standalone.js` embeds Vite output into the root `index.html` for the `build:single` script.

## Technologies and runtime dependencies

The app uses browser HTML, CSS, JavaScript, iframe, `localStorage`, and Web App Manifest APIs. The project configuration uses TypeScript, Sass, Vite, ESLint, and Prettier; `package.json` also declares `fs` 0.0.2 as a dependency. The application has no registered service worker in the tracked source.

## License

For documentation, the repository [LICENSE](LICENSE) file is authoritative: it contains GPLv3 text and additional project-specific terms. `package.json` also contains a `MIT` license field; this README does not interpret or reconcile that conflict.

## Author

The repository copyright notice identifies Denis Gutsuliak (`d9911.org`), 2024–2025.

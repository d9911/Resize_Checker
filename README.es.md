[English](README.md) | Español | [Русский](README.ru.md)

# Resize Checker

## Propósito

Resize Checker previsualiza una URL o HTML proporcionado en anchos de viewport seleccionados para comprobar diseños adaptables.

## Dirección web

<https://resize-checker.d9911.org/>

## Funciones verificadas

- Selecciona anchos predefinidos de 320, 375, 425, 768, 1024 o 1440 píxeles, o introduce un ancho positivo personalizado; el campo personalizado expone 100–3000 como su rango de interfaz.
- Pega una URL o HTML. Las URL se asignan al iframe de vista previa; el HTML proporcionado se asigna con `srcdoc`.
- Carga contenido con el botón o con Ctrl/Cmd+Enter en el campo de entrada.
- Usa un iframe de vista previa de carga diferida con los tokens de sandbox `allow-scripts allow-forms`.
- Cambia la interfaz entre ruso, inglés y español, y guarda el idioma y tema seleccionados en `localStorage` del navegador.
- Incluye un manifiesto web e iconos de app. No hay registro de service worker en el repositorio, por lo que este README no afirma funcionamiento sin conexión ni instalación.

## Uso

1. Elige un ancho de viewport predefinido o introduce un ancho personalizado.
2. Pega una URL o HTML en el campo de origen.
3. Selecciona **Cargar** o presiona Ctrl/Cmd+Enter para actualizar la vista previa.

## Desarrollo local y compilación

`package.json` define los siguientes scripts; aquí no se afirma que una instalación o compilación haya tenido éxito:

```bash
npm run dev               # servidor de desarrollo Vite (configurado para el puerto 3000)
npm run build             # limpieza, compilación TypeScript y compilación Sass
npm run build:standalone  # compilación de producción con Vite
npm run build:single      # compilación Vite y luego src/build-standalone.js
npm run preview           # vista previa de Vite
npm run lint              # ESLint para src/**/*.ts
```

El repositorio incluye `package-lock.json` y `yarn.lock`, pero `package.json` no tiene un campo `packageManager`. Los lockfiles no son equivalentes: el package lock registra, por ejemplo, Vite `^6.3.5` y TypeScript `^5.1.3`, mientras que `package.json` declara Vite `^8.2.2` y TypeScript `^6.0.3`, y el lock de Yarn tiene entradas para estos últimos rangos. Selecciona y reconcilia una política de package manager/lockfile antes de tratar una instalación como reproducible; no mezcles los lockfiles.

## Estructura

- `src/index.html` es el documento de entrada de Vite; `src/main.ts` importa los estilos y la lógica de aplicación de `src/index.ts`.
- `src/styles.scss` y `src/d9911-theme.css` definen los estilos.
- `vite.config.ts` establece `src` como raíz de Vite, expone `public/` y escribe las compilaciones en `dist/`.
- `public/` contiene el manifiesto y los iconos; `src/build-standalone.js` inserta la salida de Vite en el `index.html` raíz para el script `build:single`.

## Tecnologías y dependencias de ejecución

La app usa HTML, CSS, JavaScript, iframe, `localStorage` y Web App Manifest del navegador. La configuración del proyecto usa TypeScript, Sass, Vite, ESLint y Prettier; `package.json` también declara `fs` 0.0.2 como dependencia. La aplicación no tiene un service worker registrado en el código fuente incluido.

## Licencia

Para la documentación, el archivo [LICENSE](LICENSE) del repositorio es la fuente autoritativa: contiene texto de GPLv3 y términos adicionales específicos del proyecto. `package.json` también contiene el campo de licencia `MIT`; este README no interpreta ni reconcilia ese conflicto.

## Autor

El aviso de copyright del repositorio identifica a Denis Gutsuliak (`d9911.org`), 2024–2025.

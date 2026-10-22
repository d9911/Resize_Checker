[English](README.md) | Español | [Русский](README.ru.md)

# Resize Checker

## Propósito

Resize Checker previsualiza una URL o HTML proporcionado en anchos de viewport seleccionados para comprobar diseños adaptables.

## Dirección web

<https://resize-checker.d9911.org/>

## Funciones verificadas

- Selecciona anchos predefinidos de 320, 375, 425, 768, 1024 o 1440 píxeles, o introduce un ancho entero personalizado de 100 a 3000 píxeles.
- Pega una URL HTTP(S) o HTML. Al cambiar entre URL y HTML, se elimina el origen anterior del iframe.
- Carga contenido con el botón o con Ctrl/Cmd+Enter en el campo de entrada.
- Usa un iframe de vista previa de carga diferida con los tokens de sandbox `allow-scripts allow-forms`.
- Cambia la interfaz entre ruso, inglés y español, y guarda el idioma y tema seleccionados en `localStorage` del navegador.
- Incluye un manifiesto web e iconos de app. No hay registro de service worker en el repositorio, por lo que este README no afirma funcionamiento sin conexión ni instalación.

## Uso

1. Elige un ancho de viewport predefinido o introduce un ancho personalizado.
2. Pega una URL o HTML en el campo de origen.
3. Selecciona **Cargar** o presiona Ctrl/Cmd+Enter para actualizar la vista previa.

## Desarrollo local y compilación

Usa Node.js 22.13+ (22.x) o 24+, y npm. Con nvm, ejecuta `nvm install` y `nvm use` en el repositorio.

```bash
npm ci                    # instala las versiones de package-lock.json
npm run check             # comprueba TypeScript sin generar archivos
npm run dev               # servidor de desarrollo Vite (configurado para el puerto 3000)
npm run build             # comprobación de tipos y compilación Vite de producción
npm run build:standalone  # compilación de producción con Vite
npm run build:single      # compilación Vite y luego src/build-standalone.js
npm run preview           # vista previa de Vite
npm test                  # pruebas de regresión del HTML autónomo
npm run lint              # ESLint para la app, scripts y pruebas
```

Usa npm y el archivo versionado `package-lock.json` como único lockfile. TypeScript permanece en 6.0 porque el parser typescript-eslint instalado admite versiones inferiores a 6.1. `make build` y `make build-single` llaman a los mismos scripts npm. `npm run preview` sirve `dist/`; `npm run build:single` también actualiza el `index.html` raíz con JavaScript y CSS integrados.

## Estructura

- `src/index.html` es el documento de entrada de Vite; `src/main.ts` importa los estilos y la lógica de aplicación de `src/index.ts`.
- `src/styles.scss` y `src/d9911-theme.css` definen los estilos.
- `vite.config.ts` establece `src` como raíz de Vite, expone `public/` y escribe las compilaciones en `dist/`.
- `public/` contiene el manifiesto y los iconos; `src/build-standalone.js` inserta la salida de Vite en el `index.html` raíz para el script `build:single`.

## Tecnologías y dependencias de ejecución

La app usa HTML, CSS, JavaScript, iframe, `localStorage` y Web App Manifest del navegador. La configuración del proyecto usa TypeScript, Sass, Vite, ESLint y Prettier. No hay dependencias npm de ejecución. La aplicación no tiene un service worker registrado en el código fuente incluido.

## Licencia

Para la documentación, el archivo [LICENSE](LICENSE) del repositorio es la fuente autoritativa: contiene texto de GPLv3 y términos adicionales específicos del proyecto.

## Autor

El aviso de copyright del repositorio identifica a Denis Gutsuliak (`d9911.org`), 2024–2025.

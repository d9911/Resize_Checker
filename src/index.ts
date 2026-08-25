// Типы
interface ResponsiveCheckerConfig {
  defaultWidth: number;
  iframeSelector: string;
  selectSelector: string;
  customInputSelector: string;
  sourceInputSelector: string;
  goButtonSelector: string;
}

type Language = 'ru' | 'en' | 'es';
type Theme = 'dark' | 'light';

const TRANSLATIONS = {
  ru: {
    pageTitle: 'Resize Checker — проверка адаптивного дизайна', description: 'Проверяйте веб-страницы и HTML на популярных и пользовательских размерах экрана.',
    skip: 'Перейти к предпросмотру', title: 'Resize Checker', subtitle: 'Проверяйте адаптивность страницы на разных размерах экрана.', displaySettings: 'Настройки отображения', language: 'Язык', controls: 'Настройки предпросмотра',
    breakpoints: 'Готовые брейкпоинты:', breakpointSelect: 'Выберите размер экрана', customWidth: 'Пользовательский размер (px):', customPlaceholder: 'например: 900', customWidthAria: 'Введите пользовательскую ширину в пикселях', source: 'URL или HTML-код:',
    sourcePlaceholder: 'Вставьте URL или HTML-код для тестирования...', sourceAria: 'Поле для ввода URL или HTML-кода', load: 'Загрузить', loading: 'Загрузка…', loadAria: 'Загрузить контент', previewTitle: 'Предпросмотр контента', previewViewport: 'Прокручиваемая область предпросмотра', footer: 'Локальный инструмент для проверки адаптивной вёрстки.', enterSource: 'Введите URL или HTML', loadError: 'Ошибка загрузки', lightTheme: 'Включить светлую тему', darkTheme: 'Включить тёмную тему'
  },
  en: {
    pageTitle: 'Resize Checker — responsive design preview', description: 'Preview web pages and HTML at popular and custom viewport widths.',
    skip: 'Skip to preview', title: 'Resize Checker', subtitle: 'Check responsive layouts at different viewport widths.', displaySettings: 'Display settings', language: 'Language', controls: 'Preview settings',
    breakpoints: 'Preset breakpoints:', breakpointSelect: 'Choose a viewport width', customWidth: 'Custom width (px):', customPlaceholder: 'for example: 900', customWidthAria: 'Enter a custom width in pixels', source: 'URL or HTML:',
    sourcePlaceholder: 'Paste a URL or HTML to preview...', sourceAria: 'URL or HTML input', load: 'Load', loading: 'Loading…', loadAria: 'Load content', previewTitle: 'Content preview', previewViewport: 'Scrollable preview area', footer: 'A local tool for checking responsive layouts.', enterSource: 'Enter a URL or HTML', loadError: 'Loading error', lightTheme: 'Use light theme', darkTheme: 'Use dark theme'
  },
  es: {
    pageTitle: 'Resize Checker — vista previa adaptable', description: 'Previsualiza páginas web y HTML en anchos de pantalla populares y personalizados.',
    skip: 'Ir a la vista previa', title: 'Resize Checker', subtitle: 'Comprueba diseños adaptables en diferentes anchos de pantalla.', displaySettings: 'Ajustes de visualización', language: 'Idioma', controls: 'Ajustes de vista previa',
    breakpoints: 'Puntos de ruptura:', breakpointSelect: 'Elige un ancho de pantalla', customWidth: 'Ancho personalizado (px):', customPlaceholder: 'por ejemplo: 900', customWidthAria: 'Introduce un ancho personalizado en píxeles', source: 'URL o HTML:',
    sourcePlaceholder: 'Pega una URL o HTML para previsualizar...', sourceAria: 'Campo de URL o HTML', load: 'Cargar', loading: 'Cargando…', loadAria: 'Cargar contenido', previewTitle: 'Vista previa del contenido', previewViewport: 'Área desplazable de vista previa', footer: 'Una herramienta local para comprobar diseños adaptables.', enterSource: 'Introduce una URL o HTML', loadError: 'Error de carga', lightTheme: 'Usar tema claro', darkTheme: 'Usar tema oscuro'
  }
} as const;

let currentLanguage: Language = 'ru';
const translate = (key: keyof typeof TRANSLATIONS.ru): string => TRANSLATIONS[currentLanguage][key];

function resolveLanguage(): Language {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'ru' || query === 'en' || query === 'es') return query;
  const saved = localStorage.getItem('resizeCheckerLanguage');
  if (saved === 'ru' || saved === 'en' || saved === 'es') return saved;
  const browser = navigator.language.toLowerCase();
  if (browser.startsWith('ru')) return 'ru';
  if (browser.startsWith('es')) return 'es';
  return 'en';
}

function applyLanguage(language: Language): void {
  currentLanguage = language;
  localStorage.setItem('resizeCheckerLanguage', language);
  document.documentElement.lang = language;
  document.title = translate('pageTitle');
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', translate('description'));
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(element => { const key = element.dataset['i18n'] as keyof typeof TRANSLATIONS.ru; if (key) element.textContent = translate(key); });
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach(element => { const key = element.dataset['i18nPlaceholder'] as keyof typeof TRANSLATIONS.ru; if (key) element.placeholder = translate(key); });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach(element => { const key = element.dataset['i18nAria'] as keyof typeof TRANSLATIONS.ru; if (key) element.setAttribute('aria-label', translate(key)); });
  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach(element => { const key = element.dataset['i18nTitle'] as keyof typeof TRANSLATIONS.ru; if (key) element.setAttribute('title', translate(key)); });
  updateLanguageMenu(language);
}

function updateLanguageMenu(language: Language): void {
  const current = document.querySelector<HTMLElement>('#language-current');
  if (current) current.textContent = language.toUpperCase();
  document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(option => {
    const selected = option.dataset['language'] === language;
    option.setAttribute('aria-selected', String(selected));
  });
}

function setupLanguageMenu(select: HTMLSelectElement): void {
  const trigger = document.querySelector<HTMLButtonElement>('#language-trigger');
  const menu = document.querySelector<HTMLElement>('#language-options');
  const options = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-language]'));
  if (!trigger || !menu || options.length === 0) return;

  const close = (restoreFocus = false): void => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  };
  const open = (): void => {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    (options.find(option => option.dataset['language'] === currentLanguage) ?? options[0])?.focus();
  };
  const choose = (option: HTMLButtonElement): void => {
    const language = option.dataset['language'] as Language;
    select.value = language;
    applyLanguage(language);
    applyTheme(document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');
    close(true);
  };

  trigger.addEventListener('click', () => menu.hidden ? open() : close());
  options.forEach((option, index) => {
    option.addEventListener('click', () => choose(option));
    option.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        options[(index + direction + options.length) % options.length]?.focus();
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        options[event.key === 'Home' ? 0 : options.length - 1]?.focus();
      }
    });
  });
  document.addEventListener('click', event => {
    if (!trigger.contains(event.target as Node) && !menu.contains(event.target as Node)) close();
  });
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset['theme'] = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem('resizeCheckerTheme', theme);
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080b12' : '#eef6ff');
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (button) {
    button.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42m0-12.72 1.42-1.42M4.22 19.78l1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 15.1A9 9 0 0 1 8.9 3.3 9 9 0 1 0 20.7 15.1Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
    button.setAttribute('aria-label', translate(theme === 'dark' ? 'lightTheme' : 'darkTheme'));
  }
}

// Конфигурация
const CONFIG: ResponsiveCheckerConfig = {
  defaultWidth: 768,
  iframeSelector: '#preview-frame',
  selectSelector: '#breakpoint-select',
  customInputSelector: '#custom-breakpoint',
  sourceInputSelector: '#input-source',
  goButtonSelector: '#go-button'
};

// Класс для управления приложением
class ResponsiveChecker {
  private iframe!: HTMLIFrameElement;
  private select!: HTMLSelectElement;
  private customInput!: HTMLInputElement;
  private sourceInput!: HTMLTextAreaElement;
  private goBtn!: HTMLButtonElement;

  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializeApp();
  }

  private initializeElements(): void {
    this.iframe = document.querySelector(CONFIG.iframeSelector) as HTMLIFrameElement;
    this.select = document.querySelector(CONFIG.selectSelector) as HTMLSelectElement;
    this.customInput = document.querySelector(CONFIG.customInputSelector) as HTMLInputElement;
    this.sourceInput = document.querySelector(CONFIG.sourceInputSelector) as HTMLTextAreaElement;
    this.goBtn = document.querySelector(CONFIG.goButtonSelector) as HTMLButtonElement;

    if (!this.iframe || !this.select || !this.customInput || !this.sourceInput || !this.goBtn) {
      throw new Error('Required DOM elements not found');
    }
  }

  private bindEvents(): void {
    this.select.addEventListener('change', () => this.setWidth(Number(this.select.value)));

    this.customInput.addEventListener('input', () => {
      const value = parseInt(this.customInput.value);
      if (value > 0) this.setWidth(value);
    });

    this.goBtn.addEventListener('click', () => this.loadContent());

    // Добавляем поддержку Enter в textarea
    this.sourceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        this.loadContent();
      }
    });
  }

  private initializeApp(): void {
    this.setWidth(Number(this.select.value) || CONFIG.defaultWidth);
  }

  private setWidth(px: number): void {
    if (px <= 0) return;
    this.iframe.style.width = `${px}px`;

    // Добавляем визуальную обратную связь
    this.iframe.style.transition = 'width 0.3s ease';
  }

  private async loadContent(): Promise<void> {
    const content = this.sourceInput.value.trim();

    if (!content) {
      this.showError(translate('enterSource'));
      return;
    }

    try {
      this.goBtn.disabled = true;
      this.goBtn.textContent = translate('loading');

      if (this.isUrl(content)) {
        await this.loadUrl(content);
      } else {
        this.loadHtml(content);
      }
    } catch (error) {
      this.showError(`${translate('loadError')}: ${error instanceof Error ? error.message : ''}`);
    } finally {
      this.goBtn.disabled = false;
      this.goBtn.textContent = translate('load');
    }
  }

  private isUrl(content: string): boolean {
    try {
      new URL(content);
      return true;
    } catch {
      return false;
    }
  }

  private async loadUrl(url: string): Promise<void> {
    this.iframe.src = url;
  }

  private loadHtml(html: string): void {
    this.iframe.srcdoc = html;
  }

  private showError(message: string): void {
    // Создаем красивое уведомление об ошибке
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      max-width: 300px;
      animation: slideIn 0.3s ease;
    `;

    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  try {
    currentLanguage = resolveLanguage();
    applyLanguage(currentLanguage);
    const languageSelect = document.querySelector<HTMLSelectElement>('#language-select');
    if (languageSelect) {
      languageSelect.value = currentLanguage;
      setupLanguageMenu(languageSelect);
      languageSelect.addEventListener('change', () => {
        applyLanguage(languageSelect.value as Language);
        applyTheme(document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');
      });
    }
    const savedTheme: Theme = localStorage.getItem('resizeCheckerTheme') === 'light' ? 'light' : 'dark';
    applyTheme(savedTheme);
    document.querySelector<HTMLButtonElement>('#theme-toggle')?.addEventListener('click', () => {
      applyTheme(document.documentElement.dataset['theme'] === 'dark' ? 'light' : 'dark');
    });
    new ResponsiveChecker();
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
  }
});

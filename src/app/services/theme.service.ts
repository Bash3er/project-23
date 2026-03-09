import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) ?? 'light'
  );

  theme = this._theme.asReadonly();

  constructor() {
    // Apply theme class on init and whenever it changes
    effect(() => {
      const t = this._theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
    });
    // Apply immediately on load
    document.documentElement.setAttribute('data-theme', this._theme());
  }

  toggle(): void {
    this._theme.set(this._theme() === 'light' ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this._theme() === 'dark';
  }
}

import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error';

export interface ToastMessage {
  type: ToastType;
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private container: HTMLElement | null = null;

  showSuccess(title: string, message: string): void {
    this.show({ type: 'success', title, message });
  }

  showWarning(title: string, message: string): void {
    this.show({ type: 'warning', title, message });
  }

  showError(title: string, message: string): void {
    this.show({ type: 'error', title, message });
  }

  private show(toast: ToastMessage): void {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'feedback-toast-container';
      document.body.appendChild(this.container);
    }

    const el = document.createElement('div');
    el.className = `feedback-toast feedback-toast--${toast.type}`;
    el.innerHTML = `
      <div class="feedback-toast__title">${toast.title}</div>
      <div class="feedback-toast__message">${toast.message}</div>
    `;
    this.container.appendChild(el);

    requestAnimationFrame(() => el.classList.add('feedback-toast--visible'));

    setTimeout(() => {
      el.classList.remove('feedback-toast--visible');
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }
}

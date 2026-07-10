import { Component, computed, input, output, signal } from '@angular/core';
import { AppTheme } from '../../theme/app-theme';

@Component({
  selector: 'app-tactile-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="tactile-btn"
      [class.tactile-btn--pressed]="pressed()"
      [class.tactile-btn--secondary]="isSecondary()"
      [class.tactile-btn--disabled]="disabled()"
      [style.--btn-bg]="resolvedBg()"
      [style.--btn-dark]="resolvedDark()"
      [style.--btn-text]="resolvedText()"
      [style.--btn-height.px]="height()"
      [disabled]="disabled()"
      (mousedown)="onPress()"
      (mouseup)="onRelease()"
      (mouseleave)="onRelease()"
      (touchstart)="onPress(); $event.preventDefault()"
      (touchend)="onRelease()"
      (click)="handleClick($event)"
    >
      <span class="tactile-btn__shadow"></span>
      <span class="tactile-btn__face">
        @if (icon()) {
          <span class="tactile-btn__icon">{{ icon() }}</span>
        }
        {{ text() }}
      </span>
    </button>
  `,
  styles: [`
    .tactile-btn {
      position: relative;
      display: block;
      width: 100%;
      border: none;
      background: none;
      padding: 0 0 4px;
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 800;
    }
    .tactile-btn--disabled { cursor: not-allowed; opacity: 0.7; }
    .tactile-btn__shadow {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: var(--btn-height, 56px);
      background: var(--btn-dark);
      border-radius: 9999px;
    }
    .tactile-btn__face {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: var(--btn-height, 56px);
      background: var(--btn-bg);
      color: var(--btn-text);
      border-radius: 9999px;
      transition: transform 60ms ease-out;
      font-weight: 800;
      font-size: 16px;
    }
    .tactile-btn--pressed .tactile-btn__face { transform: translateY(4px); }
    .tactile-btn--secondary .tactile-btn__face {
      border: 2px solid #C4C5D9;
      background: #FFFFFF;
      color: #0040E0;
    }
    .tactile-btn--disabled .tactile-btn__face {
      background: #EAEEF2;
      color: rgba(67, 70, 86, 0.5);
    }
    .tactile-btn__icon { font-size: 20px; }
  `],
})
export class TactileButtonComponent {
  text = input.required<string>();
  disabled = input(false);
  isSecondary = input(false);
  icon = input<string | undefined>(undefined);
  backgroundColor = input<string>(AppTheme.primary);
  darkColor = input<string>(AppTheme.primaryDark);
  textColor = input<string>('#FFFFFF');
  height = input(56);

  tapped = output<void>();

  pressed = signal(false);

  resolvedBg = computed(() => {
    if (this.disabled()) return AppTheme.surfaceContainer;
    if (this.isSecondary()) return AppTheme.surface;
    return this.backgroundColor();
  });

  resolvedDark = computed(() => {
    if (this.disabled()) return AppTheme.surfaceDim;
    return this.darkColor();
  });

  resolvedText = computed(() => {
    if (this.disabled()) return 'rgba(67, 70, 86, 0.5)';
    if (this.isSecondary()) return AppTheme.primary;
    return this.textColor();
  });

  onPress(): void {
    if (!this.disabled()) this.pressed.set(true);
  }

  onRelease(): void {
    this.pressed.set(false);
  }

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.tapped.emit();
  }
}

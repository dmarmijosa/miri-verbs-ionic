import { Component, input } from '@angular/core';
import { AppTheme } from '../../theme/app-theme';

@Component({
  selector: 'app-squishy-progress-bar',
  standalone: true,
  template: `
    <div class="squishy-track" [style.height.px]="barHeight()">
      <div
        class="squishy-fill"
        [style.width.%]="clampedValue() * 100"
        [style.background]="gradient()"
      >
        @if (clampedValue() > 0.05) {
          <span class="squishy-dot"></span>
        }
      </div>
    </div>
  `,
  styles: [`
    .squishy-track {
      width: 100%;
      background: #EAEEF2;
      border-radius: 9999px;
      border: 1px solid rgba(214, 218, 222, 0.5);
      overflow: hidden;
      position: relative;
    }
    .squishy-fill {
      height: 100%;
      border-radius: 9999px;
      transition: width 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 0;
    }
    .squishy-dot {
      width: 6px;
      height: calc(100% - 6px);
      margin-right: 3px;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 50%;
    }
  `],
})
export class SquishyProgressBarComponent {
  value = input(0);
  barHeight = input(14);
  progressColors = input([AppTheme.primary, '#7D9CFF']);

  clampedValue = () => Math.min(1, Math.max(0, this.value()));

  gradient = () => {
    const colors = this.progressColors();
    return `linear-gradient(90deg, ${colors[0]}, ${colors[1] ?? colors[0]})`;
  };
}

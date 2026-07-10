import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playCircle } from 'ionicons/icons';
import { TactileButtonComponent } from '../../core/widgets/tactile-button/tactile-button.component';
import { SquishyProgressBarComponent } from '../../core/widgets/squishy-progress-bar/squishy-progress-bar.component';
import { AppTheme } from '../../core/theme/app-theme';

addIcons({ playCircle });

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [IonContent, IonIcon, TactileButtonComponent, SquishyProgressBarComponent],
  templateUrl: './onboarding.page.html',
  styleUrl: './onboarding.page.scss',
})
export class OnboardingPage {
  private readonly router = inject(Router);

  readonly theme = AppTheme;
  currentPage = signal(0);
  selectedGoal = signal('Regular (15 min/día)');

  readonly goals = [
    'Casual (5 min/día)',
    'Regular (15 min/día)',
    'Serio (30 min/día)',
    'Intenso (45 min/día)',
  ];

  readonly slides = [
    { id: 'welcome', type: 'welcome' },
    { id: 'video', type: 'video' },
    { id: 'gamification', type: 'gamification' },
    { id: 'goals', type: 'goals' },
  ];

  get progress(): number {
    return (this.currentPage() + 1) / 4;
  }

  skip(): void {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  next(): void {
    if (this.currentPage() < 3) {
      this.currentPage.update((p) => p + 1);
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  openVideo(): void {
    this.router.navigate(['/presentation-video']);
  }

  selectGoal(goal: string): void {
    this.selectedGoal.set(goal);
  }
}

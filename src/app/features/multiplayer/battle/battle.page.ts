import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { SquishyProgressBarComponent } from '../../../core/widgets/squishy-progress-bar/squishy-progress-bar.component';
import { VerbService } from '../../../core/services/verb.service';
import { AppTheme } from '../../../core/theme/app-theme';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, TactileButtonComponent, SquishyProgressBarComponent],
  templateUrl: './battle.page.html',
  styleUrl: './battle.page.scss',
})
export class BattlePage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly verbService = inject(VerbService);

  readonly theme = AppTheme;
  phase = signal<'playing' | 'done'>('playing');
  timeLeft = signal(45);
  currentIndex = signal(0);
  myScore = signal(0);
  rivalScore = signal(7);
  selectedOption = signal<string | null>(null);
  isAnswered = signal(false);
  questions = signal<{ text: string; correct: string; options: string[] }[]>([]);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.generateQuestions();
    this.timer = setInterval(() => {
      this.timeLeft.update((t) => {
        if (t <= 1) {
          this.endBattle();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  generateQuestions(): void {
    const verbs = this.verbService.getAllVerbs().sort(() => Math.random() - 0.5).slice(0, 10);
    this.questions.set(verbs.map((v) => ({
      text: `¿Pasado simple de "${v.infinitive}"?`,
      correct: v.pastSimple,
      options: [v.pastSimple, v.pastParticiple, v.gerund, v.infinitive.replace('to ', '')]
        .sort(() => Math.random() - 0.5),
    })));
  }

  get currentQ() {
    return this.questions()[this.currentIndex()];
  }

  get progress(): number {
    return (this.currentIndex() + 1) / this.questions().length;
  }

  selectOption(opt: string): void {
    if (!this.isAnswered()) this.selectedOption.set(opt);
  }

  submit(): void {
    if (!this.selectedOption() || !this.currentQ) return;
    this.isAnswered.set(true);
    if (this.selectedOption() === this.currentQ.correct) {
      this.myScore.update((s) => s + 1);
    }
  }

  next(): void {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOption.set(null);
      this.isAnswered.set(false);
    } else {
      this.endBattle();
    }
  }

  endBattle(): void {
    clearInterval(this.timer);
    this.phase.set('done');
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  get won(): boolean {
    return this.myScore() > this.rivalScore();
  }
}

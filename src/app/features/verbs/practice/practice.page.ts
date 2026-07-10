import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
} from '@ionic/angular/standalone';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { SquishyProgressBarComponent } from '../../../core/widgets/squishy-progress-bar/squishy-progress-bar.component';
import { ProgressService } from '../../../core/services/progress.service';
import { VerbService } from '../../../core/services/verb.service';
import { Verb } from '../../../core/models/verb.model';
import { AppTheme } from '../../../core/theme/app-theme';

interface QuizQuestion {
  questionText: string;
  correctAnswer: string;
  options: string[];
  isReview: boolean;
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
    TactileButtonComponent, SquishyProgressBarComponent,
  ],
  templateUrl: './practice.page.html',
  styleUrl: './practice.page.scss',
})
export class PracticePage implements OnInit {
  private readonly router = inject(Router);
  private readonly progressService = inject(ProgressService);
  private readonly verbService = inject(VerbService);

  readonly theme = AppTheme;
  title = signal('Práctica');
  levelCode = signal('a1');
  subLevel = signal(1);
  questions = signal<QuizQuestion[]>([]);
  currentIndex = signal(0);
  firstAttemptScore = signal(0);
  selectedOption = signal<string | null>(null);
  isAnswered = signal(false);
  showResults = signal(false);
  passed = signal(false);

  ngOnInit(): void {
    const state = history.state as { verbs?: Verb[] };
    const params = new URLSearchParams(window.location.search);
    this.title.set(params.get('title') ?? 'Práctica');
    this.levelCode.set(params.get('level') ?? 'a1');
    this.subLevel.set(Number(params.get('sublevel') ?? 1));

    const verbs = state?.verbs ?? this.verbService.getVerbsForSublevel(
      this.levelCode(), this.subLevel()
    );
    this.questions.set(this.generateQuiz(verbs));
  }

  get currentQuestion(): QuizQuestion | null {
    return this.questions()[this.currentIndex()] ?? null;
  }

  get progress(): number {
    const total = this.questions().length;
    return total > 0 ? (this.currentIndex() + 1) / total : 0;
  }

  generateQuiz(verbs: Verb[]): QuizQuestion[] {
    const allVerbs = this.verbService.getAllVerbs();
    const shuffled = [...verbs].sort(() => Math.random() - 0.5).slice(0, 10);
    return shuffled.map((verb) => {
      const type = Math.floor(Math.random() * 3);
      let questionText = '';
      let correctAnswer = '';
      let options: string[] = [];

      if (type === 0) {
        questionText = `¿Cuál es el significado de "${verb.infinitive}"?`;
        correctAnswer = verb.spanish;
        options = this.getDecoys(allVerbs.map((v) => v.spanish), correctAnswer);
      } else if (type === 1) {
        questionText = `¿Cuál es el pasado simple de "${verb.infinitive}"?`;
        correctAnswer = verb.pastSimple;
        options = this.getDecoys(allVerbs.map((v) => v.pastSimple), correctAnswer);
      } else {
        const blank = verb.exampleEn.replace(
          new RegExp(`\\b(${verb.infinitive.replace('to ', '')}|${verb.pastSimple}|${verb.pastParticiple}|${verb.gerund})\\b`, 'i'),
          '_______'
        );
        questionText = `Completa la frase:\n"${blank}"\n\n(${verb.exampleEs})`;
        correctAnswer = verb.pastSimple;
        options = [verb.infinitive.replace('to ', ''), verb.pastSimple, verb.pastParticiple, verb.gerund]
          .filter((v, i, a) => a.indexOf(v) === i);
        while (options.length < 4) options.push(allVerbs[Math.floor(Math.random() * allVerbs.length)].pastSimple);
      }

      return { questionText, correctAnswer, options: options.sort(() => Math.random() - 0.5), isReview: false };
    });
  }

  private getDecoys(pool: string[], correct: string): string[] {
    const unique = new Set([correct]);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    for (const d of shuffled) {
      if (unique.size >= 4) break;
      unique.add(d);
    }
    return [...unique];
  }

  selectOption(option: string): void {
    if (!this.isAnswered()) this.selectedOption.set(option);
  }

  checkAnswer(): void {
    const q = this.currentQuestion;
    if (!q || !this.selectedOption()) return;

    this.isAnswered.set(true);
    if (this.selectedOption() === q.correctAnswer && !q.isReview) {
      this.firstAttemptScore.update((s) => s + 1);
    }
  }

  nextQuestion(): void {
    const q = this.currentQuestion;
    if (!q) return;

    if (this.selectedOption() !== q.correctAnswer) {
      const updated = [...this.questions()];
      updated.push({ ...q, isReview: true });
      this.questions.set(updated);
    }

    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOption.set(null);
      this.isAnswered.set(false);
    } else {
      this.finishQuiz();
    }
  }

  async finishQuiz(): Promise<void> {
    const score = this.firstAttemptScore();
    const pass = score >= 8;
    this.passed.set(pass);
    this.showResults.set(true);

    if (pass) {
      await this.progressService.completePractice(this.levelCode(), this.subLevel(), score);
    }
  }

  goBack(): void {
    this.router.navigate(['/verbs', this.levelCode()], {
      queryParams: { title: this.title() },
    });
  }

  isCorrect(option: string): boolean {
    return this.isAnswered() && option === this.currentQuestion?.correctAnswer;
  }

  isWrong(option: string): boolean {
    return this.isAnswered() && option === this.selectedOption() && option !== this.currentQuestion?.correctAnswer;
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
  IonSearchbar, IonSpinner, IonModal,
} from '@ionic/angular/standalone';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { VerbService } from '../../../core/services/verb.service';
import { ProgressService } from '../../../core/services/progress.service';
import { ToastService } from '../../../core/services/toast.service';
import { Verb } from '../../../core/models/verb.model';
import { SublevelProgress } from '../../../core/models/progress.model';
import { AppTheme } from '../../../core/theme/app-theme';

@Component({
  selector: 'app-verbs-list',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons,
    IonSearchbar, IonSpinner, IonModal, TactileButtonComponent,
  ],
  templateUrl: './verbs-list.page.html',
  styleUrl: './verbs-list.page.scss',
})
export class VerbsListPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly verbService = inject(VerbService);
  private readonly progressService = inject(ProgressService);
  private readonly toast = inject(ToastService);

  readonly theme = AppTheme;
  title = signal('');
  levelCode = signal('a1');
  allVerbs = signal<Verb[]>([]);
  filteredVerbs = signal<Verb[]>([]);
  completedProgress = signal<SublevelProgress[]>([]);
  selectedSublevel = signal(1);
  isLoading = signal(true);
  selectedVerb = signal<Verb | null>(null);
  showDetail = signal(false);
  searchQuery = signal('');

  async ngOnInit(): Promise<void> {
    const params = this.route.snapshot.paramMap;
    const query = this.route.snapshot.queryParamMap;
    this.levelCode.set(params.get('level') ?? 'a1');
    this.title.set(query.get('title') ?? 'Verbos');

    const [verbs, progress] = await Promise.all([
      this.verbService.getVerbsByLevel(this.levelCode()),
      this.progressService.fetchSublevelProgress(),
    ]);

    this.allVerbs.set(verbs);
    this.completedProgress.set(progress);
    this.isLoading.set(false);
    this.filterVerbs();
  }

  filterVerbs(): void {
    const sub = this.selectedSublevel();
    const verbs = this.verbService.getVerbsForSublevel(this.levelCode(), sub);
    const q = this.searchQuery().toLowerCase();
    this.filteredVerbs.set(
      q ? verbs.filter((v) =>
        v.infinitive.toLowerCase().includes(q) ||
        v.spanish.toLowerCase().includes(q)
      ) : verbs
    );
  }

  selectSublevel(n: number): void {
    if (!this.isSublevelUnlocked(n)) {
      this.toast.showWarning('Subnivel bloqueado', 'Completa el subnivel anterior primero.');
      return;
    }
    this.selectedSublevel.set(n);
    this.filterVerbs();
  }

  isSublevelUnlocked(sub: number): boolean {
    return this.progressService.isSublevelUnlocked(
      this.levelCode(), sub, this.completedProgress()
    );
  }

  isSublevelCompleted(sub: number): boolean {
    return this.completedProgress().some(
      (p) => p.levelCode === this.levelCode() && p.subLevel === sub && p.isCompleted
    );
  }

  openVerbDetail(verb: Verb): void {
    this.selectedVerb.set(verb);
    this.showDetail.set(true);
  }

  startPractice(): void {
    const verbs = this.verbService.getVerbsForSublevel(
      this.levelCode(), this.selectedSublevel()
    );
    this.router.navigate(['/practice'], {
      queryParams: {
        level: this.levelCode(),
        sublevel: this.selectedSublevel(),
        title: this.title(),
      },
      state: { verbs },
    });
  }

  onSearch(event: CustomEvent): void {
    this.searchQuery.set(event.detail.value ?? '');
    this.filterVerbs();
  }
}

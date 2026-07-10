import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { BattleService } from '../../../core/services/battle.service';
import { AppTheme } from '../../../core/theme/app-theme';

@Component({
  selector: 'app-waiting-challenge',
  standalone: true,
  imports: [IonContent, IonSpinner, TactileButtonComponent],
  templateUrl: './waiting-challenge.page.html',
  styleUrl: './waiting-challenge.page.scss',
})
export class WaitingChallengePage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly battle = inject(BattleService);

  readonly theme = AppTheme;
  opponentName = signal('');
  opponentAvatar = signal('');
  sessionId = signal('');
  canCancel = signal(false);
  rejected = signal(false);
  private timer?: ReturnType<typeof setTimeout>;
  private acceptTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.opponentName.set(params.get('opponent') ?? 'Rival');
    this.opponentAvatar.set(params.get('avatar') ?? 'assets/images/mascot_happy.png');
    this.sessionId.set(params.get('sessionId') ?? '');

    setTimeout(() => this.canCancel.set(true), 5000);

    this.acceptTimer = setTimeout(() => {
      this.router.navigate(['/battle'], {
        queryParams: { sessionId: this.sessionId() },
        replaceUrl: true,
      });
    }, 4000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    clearTimeout(this.acceptTimer);
  }

  async cancel(): Promise<void> {
    await this.battle.cancelChallenge(this.sessionId());
    this.router.navigateByUrl('/home');
  }
}

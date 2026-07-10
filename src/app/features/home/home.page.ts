import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonMenuButton,
  IonIcon,
  IonModal,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  star, flash, trophy, analytics, diamond, ribbon,
  lockClosed, chevronForward, flame, videocam, logoTiktok,
  logOut, trash, person,
} from 'ionicons/icons';
import { SquishyProgressBarComponent } from '../../core/widgets/squishy-progress-bar/squishy-progress-bar.component';
import { TactileButtonComponent } from '../../core/widgets/tactile-button/tactile-button.component';
import { AuthService } from '../../core/services/auth.service';
import { ProgressService } from '../../core/services/progress.service';
import { BattleService } from '../../core/services/battle.service';
import { ConfigService } from '../../core/services/config.service';
import { ToastService } from '../../core/services/toast.service';
import { AppTheme, CEFR_UNITS, AVATARS } from '../../core/theme/app-theme';
import { UserProfile } from '../../core/models/profile.model';
import { SublevelProgress } from '../../core/models/progress.model';
import { BattleStats } from '../../core/models/battle.model';
import { AppConfig } from '../../core/models/app-config.model';
import { OnlineFriendsFabComponent } from '../multiplayer/online-friends-fab/online-friends-fab.component';

addIcons({
  star, flash, trophy, analytics, diamond, ribbon,
  lockClosed, chevronForward, flame, videocam, logoTiktok,
  logOut, trash, person,
});

const UNIT_ICONS: Record<string, string> = {
  star: 'star', flash: 'flash', trophy: 'trophy',
  analytics: 'analytics', diamond: 'diamond', ribbon: 'ribbon',
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonMenu, IonMenuButton, IonIcon, IonModal,
    SquishyProgressBarComponent, TactileButtonComponent, OnlineFriendsFabComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly progress = inject(ProgressService);
  private readonly battle = inject(BattleService);
  private readonly config = inject(ConfigService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly theme = AppTheme;
  readonly units = CEFR_UNITS;
  readonly avatars = AVATARS;
  readonly unitIcons = UNIT_ICONS;

  profile = signal<UserProfile | null>(null);
  completedProgress = signal<SublevelProgress[]>([]);
  battleStats = signal<BattleStats | null>(null);
  appConfig = signal<AppConfig | null>(null);
  showAvatarPicker = signal(false);

  async ngOnInit(): Promise<void> {
    const [profile, progress, stats, cfg] = await Promise.all([
      this.auth.getProfile(),
      this.progress.fetchSublevelProgress(),
      this.battle.getMyStats(),
      this.config.getConfig(),
    ]);
    this.profile.set(profile);
    this.completedProgress.set(progress);
    this.battleStats.set(stats);
    this.appConfig.set(cfg);
  }

  get greeting(): string {
    const hour = new Date().getHours();
    const name = this.profile()?.fullName?.split(' ')[0] ?? 'Estudiante';
    if (hour < 12) return `¡Buenos días, ${name}!`;
    if (hour < 18) return `¡Buenas tardes, ${name}!`;
    return `¡Buenas noches, ${name}!`;
  }

  isLevelUnlocked(level: string): boolean {
    return this.progress.isLevelUnlocked(level, this.completedProgress());
  }

  getLevelPercentage(level: string): number {
    return this.progress.getLevelPercentage(level, this.completedProgress());
  }

  openUnit(level: string, title: string): void {
    if (!this.isLevelUnlocked(level)) {
      this.toast.showWarning('Nivel bloqueado', 'Completa el nivel anterior al 100% para desbloquear.');
      return;
    }
    this.router.navigate(['/verbs', level], { queryParams: { title } });
  }

  openVideo(): void {
    this.router.navigate(['/presentation-video']);
  }

  openTikTok(): void {
    const url = this.appConfig()?.tiktokUrl;
    if (url) window.open(url, '_blank');
  }

  async selectAvatar(path: string): Promise<void> {
    await this.auth.updateAvatar(path);
    const p = this.profile();
    if (p) this.profile.set({ ...p, avatarUrl: path });
    this.showAvatarPicker.set(false);
    this.toast.showSuccess('Avatar actualizado', 'Tu mascota ha cambiado.');
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.toast.showSuccess('Cerrar sesión', 'Has cerrado sesión con éxito.');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async deleteAccount(): Promise<void> {
    await this.auth.deleteAccount();
    this.toast.showSuccess('Cuenta eliminada', 'Tu cuenta ha sido eliminada.');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

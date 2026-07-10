import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonFab, IonFabButton, IonModal, IonSegment, IonSegmentButton, IonLabel,
  IonContent, IonIcon, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gameController, people, personAdd, close } from 'ionicons/icons';
import { BattleService } from '../../../core/services/battle.service';
import { OnlinePlayer, FriendRequest } from '../../../core/models/battle.model';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { AppTheme } from '../../../core/theme/app-theme';

addIcons({ gameController, people, personAdd, close });

@Component({
  selector: 'app-online-friends-fab',
  standalone: true,
  imports: [
    IonFab, IonFabButton, IonModal, IonSegment, IonSegmentButton, IonLabel,
    IonContent, IonIcon, IonSpinner, TactileButtonComponent,
  ],
  templateUrl: './online-friends-fab.component.html',
  styleUrl: './online-friends-fab.component.scss',
})
export class OnlineFriendsFabComponent implements OnInit {
  private readonly battle = inject(BattleService);
  private readonly router = inject(Router);

  readonly theme = AppTheme;
  isOpen = signal(false);
  activeTab = signal<'arena' | 'friends' | 'social'>('arena');
  onlinePlayers = signal<OnlinePlayer[]>([]);
  friends = signal<OnlinePlayer[]>([]);
  requests = signal<FriendRequest[]>([]);
  isLoading = signal(false);

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    const [online, friends, requests] = await Promise.all([
      this.battle.getOnlinePlayers(),
      this.battle.getFriends(),
      this.battle.getFriendRequests(),
    ]);
    this.onlinePlayers.set(online);
    this.friends.set(friends);
    this.requests.set(requests);
    this.isLoading.set(false);
  }

  get onlineCount(): number {
    return this.onlinePlayers().filter((p) => p.status === 'online').length;
  }

  async challenge(player: OnlinePlayer): Promise<void> {
    this.isOpen.set(false);
    const session = await this.battle.createChallenge(player.id);
    this.router.navigate(['/waiting-challenge'], {
      queryParams: { sessionId: session.id, opponent: player.fullName, avatar: player.avatarUrl },
    });
  }

  openSheet(): void {
    this.isOpen.set(true);
    this.loadData();
  }
}

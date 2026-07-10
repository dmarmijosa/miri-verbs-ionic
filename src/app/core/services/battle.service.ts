import { Injectable } from '@angular/core';
import {
  BattleStats,
  BattleSession,
  OnlinePlayer,
  FriendRequest,
} from '../models/battle.model';

const MOCK_STATS: BattleStats = {
  wins: 12,
  losses: 5,
  ties: 2,
  abandons: 1,
  winStreak: 3,
};

const MOCK_ONLINE: OnlinePlayer[] = [
  { id: 'p1', fullName: 'Ana García', avatarUrl: 'assets/images/mascot_celebrating.png', status: 'online' },
  { id: 'p2', fullName: 'Carlos Ruiz', avatarUrl: 'assets/images/mascot_happy.png', status: 'online' },
  { id: 'p3', fullName: 'Laura Méndez', avatarUrl: 'assets/images/mascot_sad.png', status: 'away' },
];

const MOCK_FRIENDS: OnlinePlayer[] = [
  { id: 'f1', fullName: 'Pedro López', avatarUrl: 'assets/images/mascot_happy.png', status: 'online' },
  { id: 'f2', fullName: 'María Santos', avatarUrl: 'assets/images/mascot_celebrating.png', status: 'offline' },
];

const MOCK_REQUESTS: FriendRequest[] = [
  {
    id: 'r1',
    fromUserId: 'u99',
    fromName: 'Juan Pérez',
    fromAvatar: 'assets/images/mascot_happy.png',
    status: 'pending',
  },
];

@Injectable({ providedIn: 'root' })
export class BattleService {
  async getMyStats(): Promise<BattleStats> {
    await this.delay(200);
    return { ...MOCK_STATS };
  }

  async getOnlinePlayers(): Promise<OnlinePlayer[]> {
    await this.delay(300);
    return [...MOCK_ONLINE];
  }

  async getFriends(): Promise<OnlinePlayer[]> {
    await this.delay(300);
    return [...MOCK_FRIENDS];
  }

  async getFriendRequests(): Promise<FriendRequest[]> {
    await this.delay(200);
    return [...MOCK_REQUESTS];
  }

  async createChallenge(opponentId: string): Promise<BattleSession> {
    await this.delay(500);
    return {
      id: `battle-${Date.now()}`,
      challengerId: 'mock-user-001',
      opponentId,
      status: 'pending',
      wordSeed: Math.floor(Math.random() * 100000),
    };
  }

  async acceptChallenge(sessionId: string): Promise<BattleSession> {
    await this.delay(300);
    return {
      id: sessionId,
      challengerId: 'u99',
      opponentId: 'mock-user-001',
      status: 'active',
      wordSeed: 42,
    };
  }

  async cancelChallenge(sessionId: string): Promise<void> {
    await this.delay(200);
    void sessionId;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { AuthResult } from '../models/auth-result.model';
import { UserProfile } from '../models/profile.model';

const MOCK_PROFILE: UserProfile = {
  id: 'mock-user-001',
  fullName: 'Estudiante Demo',
  avatarUrl: 'assets/images/mascot_happy.png',
  streakDays: 7,
  lastPracticeDate: new Date().toISOString().split('T')[0],
  email: 'demo@miriverbs.app',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  private readonly _profile = signal<UserProfile | null>(null);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly profile = this._profile.asReadonly();
  readonly currentUserId = computed(() => this._profile()?.id ?? null);

  constructor() {
    const stored = localStorage.getItem('miriverbs_mock_session');
    if (stored === 'true') {
      this._isAuthenticated.set(true);
      this._profile.set({ ...MOCK_PROFILE });
    }
  }

  async loginWithGoogle(): Promise<AuthResult> {
    await this.delay(800);
    this._isAuthenticated.set(true);
    this._profile.set({ ...MOCK_PROFILE });
    localStorage.setItem('miriverbs_mock_session', 'true');
    return { success: true, userId: MOCK_PROFILE.id };
  }

  async loginWithApple(): Promise<AuthResult> {
    return this.loginWithGoogle();
  }

  async getProfile(): Promise<UserProfile | null> {
    await this.delay(200);
    return this._profile();
  }

  async updateAvatar(avatarUrl: string): Promise<void> {
    await this.delay(300);
    const current = this._profile();
    if (current) {
      this._profile.set({ ...current, avatarUrl });
    }
  }

  async logout(): Promise<void> {
    await this.delay(300);
    this._isAuthenticated.set(false);
    this._profile.set(null);
    localStorage.removeItem('miriverbs_mock_session');
  }

  async deleteAccount(): Promise<void> {
    await this.logout();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

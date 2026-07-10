export interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  streakDays: number;
  lastPracticeDate: string | null;
  email: string;
}

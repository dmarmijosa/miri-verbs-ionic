export interface BattleStats {
  wins: number;
  losses: number;
  ties: number;
  abandons: number;
  winStreak: number;
}

export interface BattleSession {
  id: string;
  challengerId: string;
  opponentId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'abandoned';
  wordSeed: number;
}

export interface BattleResult {
  userId: string;
  score: number;
  timeSeconds: number;
}

export interface OnlinePlayer {
  id: string;
  fullName: string;
  avatarUrl: string;
  status: 'online' | 'away' | 'offline';
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromName: string;
  fromAvatar: string;
  status: 'pending' | 'accepted' | 'rejected';
}

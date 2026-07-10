import { Injectable } from '@angular/core';
import { SublevelProgress } from '../models/progress.model';
import { CEFR_UNITS } from '../theme/app-theme';

const MOCK_PROGRESS: SublevelProgress[] = [
  { levelCode: 'a1', subLevel: 1, isCompleted: true, score: 9 },
  { levelCode: 'a1', subLevel: 2, isCompleted: true, score: 8 },
  { levelCode: 'a1', subLevel: 3, isCompleted: false, score: 6 },
];

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private progress = [...MOCK_PROGRESS];

  async fetchSublevelProgress(): Promise<SublevelProgress[]> {
    await this.delay(200);
    return [...this.progress];
  }

  async completePractice(levelCode: string, subLevel: number, score: number): Promise<boolean> {
    await this.delay(300);
    const passed = score >= 8;
    if (passed) {
      const existing = this.progress.find(
        (p) => p.levelCode === levelCode && p.subLevel === subLevel
      );
      if (existing) {
        existing.isCompleted = true;
        existing.score = score;
      } else {
        this.progress.push({ levelCode, subLevel, isCompleted: true, score });
      }
    }
    return passed;
  }

  isLevelUnlocked(levelCode: string, completed: SublevelProgress[]): boolean {
    const idx = CEFR_UNITS.findIndex((u) => u.level === levelCode);
    if (idx <= 0) return true;
    const prevLevel = CEFR_UNITS[idx - 1].level;
    const prevTotal = 6;
    const prevCompleted = completed.filter(
      (p) => p.levelCode === prevLevel && p.isCompleted
    ).length;
    return prevCompleted >= prevTotal;
  }

  isSublevelUnlocked(levelCode: string, subLevel: number, completed: SublevelProgress[]): boolean {
    if (subLevel <= 1) return this.isLevelUnlocked(levelCode, completed);
    const prev = completed.find(
      (p) => p.levelCode === levelCode && p.subLevel === subLevel - 1 && p.isCompleted
    );
    return !!prev && this.isLevelUnlocked(levelCode, completed);
  }

  getLevelPercentage(levelCode: string, completed: SublevelProgress[]): number {
    const done = completed.filter((p) => p.levelCode === levelCode && p.isCompleted).length;
    return Math.round((done / 6) * 100);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

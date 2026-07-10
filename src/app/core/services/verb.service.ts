import { Injectable } from '@angular/core';
import { Verb } from '../models/verb.model';
import { SYLLABUS_VERBS } from '../data/syllabus.data';

@Injectable({ providedIn: 'root' })
export class VerbService {
  async getVerbsByLevel(levelCode: string): Promise<Verb[]> {
    await this.delay(300);
    return SYLLABUS_VERBS.filter((v) => v.difficulty === levelCode.toLowerCase());
  }

  getVerbsForSublevel(levelCode: string, subLevel: number): Verb[] {
    const verbs = SYLLABUS_VERBS.filter((v) => v.difficulty === levelCode.toLowerCase());
    const sorted = [...verbs].sort((a, b) => a.infinitive.localeCompare(b.infinitive));
    const start = (subLevel - 1) * 10;
    return sorted.slice(start, start + 10);
  }

  getAllVerbs(): Verb[] {
    return SYLLABUS_VERBS;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

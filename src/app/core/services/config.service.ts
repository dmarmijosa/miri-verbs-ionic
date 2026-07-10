import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config.model';

const MOCK_CONFIG: AppConfig = {
  presentationVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  tiktokName: 'Teacher Miryan❤️👩‍🏫💻',
  tiktokUrl: 'https://www.tiktok.com/@miryanyanez16',
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  async getConfig(): Promise<AppConfig> {
    await this.delay(150);
    return { ...MOCK_CONFIG };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

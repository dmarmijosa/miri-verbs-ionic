import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonContent, IonBackButton, IonHeader, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { TactileButtonComponent } from '../../../core/widgets/tactile-button/tactile-button.component';
import { ConfigService } from '../../../core/services/config.service';
import { AppTheme } from '../../../core/theme/app-theme';

@Component({
  selector: 'app-presentation-video',
  standalone: true,
  imports: [IonContent, IonBackButton, IonHeader, IonToolbar, IonButtons, TactileButtonComponent],
  templateUrl: './presentation-video.page.html',
  styleUrl: './presentation-video.page.scss',
})
export class PresentationVideoPage implements OnInit {
  private readonly router = inject(Router);
  private readonly config = inject(ConfigService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly theme = AppTheme;
  videoUrl!: SafeResourceUrl;

  async ngOnInit(): Promise<void> {
    const cfg = await this.config.getConfig();
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cfg.presentationVideoUrl);
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }
}

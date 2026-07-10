import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IonContent, IonSpinner],
  template: `
    <ion-content class="splash-content">
      <div class="splash-inner">
        <img src="assets/images/logo.png" alt="Miriverbs" class="splash-logo" />
        <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
    </ion-content>
  `,
  styles: [`
    .splash-content { --background: #F6FAFE; }
    .splash-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 24px;
    }
    .splash-logo { width: 120px; height: 120px; object-fit: contain; }
  `],
})
export class SplashPage implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      if (this.auth.isAuthenticated()) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/onboarding', { replaceUrl: true });
      }
    }, 1200);
  }
}

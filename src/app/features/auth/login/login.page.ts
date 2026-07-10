import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { GoogleLogoComponent } from '../../../core/widgets/google-logo/google-logo.component';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { AppTheme } from '../../../core/theme/app-theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonContent, IonSpinner, GoogleLogoComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly theme = AppTheme;
  isLoading = signal(false);

  async signInWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    const result = await this.auth.loginWithGoogle();
    this.isLoading.set(false);

    if (result.success) {
      this.toast.showSuccess('¡Sesión con Google!', 'Iniciaste sesión correctamente.');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.toast.showError('Error de Google', result.errorMessage ?? 'No se pudo completar el inicio de sesión.');
    }
  }

  async signInWithApple(): Promise<void> {
    this.isLoading.set(true);
    const result = await this.auth.loginWithApple();
    this.isLoading.set(false);

    if (result.success) {
      this.toast.showSuccess('¡Sesión con Apple!', 'Iniciaste sesión con Apple correctamente.');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.toast.showError('Error de Apple', result.errorMessage ?? 'No se pudo completar el inicio de sesión.');
    }
  }
}

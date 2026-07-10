import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/onboarding/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'presentation-video',
    loadComponent: () =>
      import('./features/home/presentation-video/presentation-video.page').then(
        (m) => m.PresentationVideoPage
      ),
  },
  {
    path: 'verbs/:level',
    loadComponent: () =>
      import('./features/verbs/verbs-list/verbs-list.page').then((m) => m.VerbsListPage),
  },
  {
    path: 'practice',
    loadComponent: () =>
      import('./features/verbs/practice/practice.page').then((m) => m.PracticePage),
  },
  {
    path: 'waiting-challenge',
    loadComponent: () =>
      import('./features/multiplayer/waiting-challenge/waiting-challenge.page').then(
        (m) => m.WaitingChallengePage
      ),
  },
  {
    path: 'battle',
    loadComponent: () =>
      import('./features/multiplayer/battle/battle.page').then((m) => m.BattlePage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

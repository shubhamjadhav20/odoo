import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth/auth.guard';
import {
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import { AddQuestionsComponent } from './shared/add-questions/add-questions.component';
import { QuestionsComponent } from './shared/questions/questions.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'question', component: QuestionsComponent, title: 'Question' },
  { path: 'ask', component: AddQuestionsComponent, title: 'Ask' },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   title: 'Home',
  //   // canActivate: [authGuard]
  // },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    providers: [provideClientHydration(withNoHttpTransferCache())], // Disable SSR
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

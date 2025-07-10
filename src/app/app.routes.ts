import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { 
    path: 'home', 
    component: HomeComponent, 
    title: 'Home',
    canActivate: [authGuard] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
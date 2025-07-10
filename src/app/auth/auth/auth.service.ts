import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  signup(userData: any): boolean {
    const userExists = this.users.some(u => u.email === userData.email);
    if (userExists) return false;
    
    this.users.push(userData);
    this.currentUser.next(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.value;
  }
}
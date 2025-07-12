import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../../shared/toaster/toaster.component';

const backendUrl = environment.backendUrl + 'api/';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  postQuestion(data: { title: string; description: string; tags: string[] }) {
    return data;
  }
  private users: any[] = [];
  private currentUser = new BehaviorSubject<any>(null);

  currentUser$ = this.currentUser.asObservable();
  token: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  login(email: string, password: string): Observable<any> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    // if (user) {
    //   this.currentUser.next(user);
    //   localStorage.setItem('currentUser', JSON.stringify(user));
    //   return true;
    // }
    // return false;
    return this.http.post<{
      message: string;
    }>(backendUrl + 'login', { email, password });
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<{
      message: string;
    }>(backendUrl + 'register', { email, password });
  }

  getOneQuestion(id: string): Observable<any> {
    return this.http.get<{
      message: string;
    }>(backendUrl + 'v1/question/' + id);
  }
  getQuestionList(
    pageNo: number,
    pagesize: number,
    sortBy: string,
    sortdirection: number,
    search: string = ''
  ) {
    // http://localhost:5000/api/v1/question?pageno=1&pagesize=10&sort=upvote&sortdirection=-1&user=64f5c8e9f1e6bfc1a1a00102&filter=What
    return this.http.get<{
      message: string;
      data: any;
    }>(
      backendUrl +
        `v1/question/?pageno=${pageNo}&pagesize=${pagesize}&sort=${sortBy}&sortdirection=${sortdirection}&filter=${search}`
    );
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    this.token = '';
    this.router.navigate(['/login']);
    this.snackBar.openFromComponent(ToasterComponent, {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      data: {
        isSuccess: true,
        title: 'Logged out successfully!',
      },
    });
  }
  setToken(token: string) {
    this.token = token;
  }
  isLoggedIn(): boolean {
    console.log('This is the token', this.token);
    return this.token != '';
  }
}

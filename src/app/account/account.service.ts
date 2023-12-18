import { Injectable } from '@angular/core';
import { Account, User ,Address} from './model/model.module';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/env/env';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.user$.next(this.getRole());
  }
  login(auth: any): Observable<any> {
    return this.httpClient.post(environment.apiHost+'users/login', {username: auth.username, password: auth.password}, {headers: this.headers, responseType: 'json'});
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  add(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiHost + 'add', user)
  }


  update(user: User): Observable<User> {
    const url = `${environment.apiHost}users/${user.id}`;
    return this.httpClient.put<User>(url, user);
  }


  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id)
  }


  delete(id: number): Observable<void> {
    console.log("Uslo")
    const url = `${environment.apiHost}users/${id}`;
    return this.httpClient.delete<void>(url);
  }

  signup(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiHost + 'users/signup', user);
  }

  sendEmail(user: User): Observable<string> {
    const userId = user.id;
    // @ts-ignore
    let params = new HttpParams().set('userId', 3);
    const options = { params };
    return this.httpClient.get<string>(environment.apiHost + 'email/send', options);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }
  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role;
    }
    return null;
  }
  getUserId(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).id;
    }
    return null;
  }
  setUser(): void {
    this.user$.next(this.getRole());
  }
}

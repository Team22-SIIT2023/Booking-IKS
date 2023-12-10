import { Injectable } from '@angular/core';
import { Account, User ,Address} from './model/model.module';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
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

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id)
  }
}

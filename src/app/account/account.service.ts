import { Injectable } from '@angular/core';
import { Account, User ,Address} from './model/model.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor(private httpClient: HttpClient) {
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
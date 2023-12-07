import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Notification} from "./notification/model/model.module";

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  notifications: Notification[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(environment.apiHost + 'notifications/guest/1')
  }

}

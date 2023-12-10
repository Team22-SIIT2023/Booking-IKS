import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class InterceptService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const item = localStorage.getItem('user');
    // @ts-ignore
    const decodedItem = JSON.parse(item);

    if (item) {
      const cloned = req.clone({
        //headers: req.headers.set('X-Auth-Token', decodedItem.token)
        headers: req.headers.set('Authorization', "Bearer " +  decodedItem.token)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}


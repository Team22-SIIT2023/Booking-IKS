import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailsComponent } from './accommodation-details.component';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {AccommodationsService} from "../accommodations.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ReservationsService} from "../../reservations/reservations.service";
import {CommentsService} from "../../comments/comments.service";
import {MapService} from "../../map/map.service";
import {UserService} from "../../account/account.service";
import {SocketService} from "../../socket/socket.service";
import {NotificationService} from "../../notification/notification.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      providers: [
        AccommodationsService,
        ReservationsService,
        CommentsService,
        MapService,
        UserService,
        MatSnackBar,
        SocketService,
        NotificationService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: (fn: (value: any) => void) => fn({
                id: '1'
              }),
            },
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }
      ],
      imports: [HttpClientTestingModule,MaterialModule,BrowserAnimationsModule ]
    });
    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

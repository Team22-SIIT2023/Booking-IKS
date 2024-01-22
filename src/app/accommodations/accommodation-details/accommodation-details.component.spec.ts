import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

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
import {MaterialModule} from "../../infrastructure/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;
  let el: HTMLElement;

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


  function setValues(numberValue:string,startDate:string,endDate:string,price:number) {
    component.form.controls['numberSelect'].setValue(numberValue);
    component.form.controls['startDateInput'].setValue(new Date(startDate));
    component.form.controls['endDateInput'].setValue(new Date(endDate));
    component.form.controls['priceInput'].setValue(price);
    fixture.detectChanges();
  }

  it(`should enable the button and call the createReservation method because the inputs are valid`, fakeAsync(() => {

    spyOn(component, 'isDateInAvailableRange').and.returnValue(true);
    spyOn(component, 'createReservation');
    setValues("2","1/25/2024","1/30/2024",1000);

    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeFalsy();
    expect(component.form.valid).toBeTruthy();

    button.nativeElement.click();
    tick();
    expect(component.createReservation).toHaveBeenCalledTimes(1);

  }));

  it("should disable the button when inputs are invalid, and not call createReservation",fakeAsync(() => {

    spyOn(component, 'createReservation');
    setValues("","","",0);

    expect(component.form.valid).toBeFalsy();
    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();

    button.nativeElement.click();
    tick();
    expect(component.createReservation).toHaveBeenCalledTimes(0);

  }));

  it("should disable the button when guest number select is not empty, but dates and price are",() => {

    setValues("2","","",0);

    expect(component.form.valid).toBeFalsy();
    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();

  });

  it("should disable the button when guest number select and dates are not empty, but the price is",() => {

    spyOn(component, 'isDateInAvailableRange').and.returnValue(true);
    setValues("2","1/25/2024","1/30/2024",0);

    expect(component.form.valid).toBeFalsy();
    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();

  });
  it("should disable the button when guest number select and price are not empty, but the dates are",() => {

    setValues("2","","",1000);

    expect(component.form.valid).toBeFalsy();
    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();

  });
  it("should disable the button when guest number select,one date and price are not empty, but one date is",() => {

    spyOn(component, 'isDateInAvailableRange').and.returnValue(true);
    setValues("2","1/25/2024","",1000);

    expect(component.form.valid).toBeFalsy();
    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();

  });
  it("should disable the button because the dates are not free",() => {

    spyOn(component, 'isDateInAvailableRange').and.returnValue(false);
    setValues("2","1/25/2024","1/30/2024",1000);

    const button = fixture.debugElement.query(By.css(".reserveButton"));
    expect(button.nativeElement.disabled).toBeTruthy();
    expect(component.form.valid).toBeFalsy();

  });


});

import { TestBed } from '@angular/core/testing';

import { AccommodationsService } from './accommodations.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockRequest1} from "../mocks/reservations.service.mock";

describe('AccommodationsService', () => {
  let service: AccommodationsService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:8080/api/accommodations';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccommodationsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAccommodationPrice and the API should return the calculated price for request', () => {
    const id = 1;
    const guestNum = 3;
    const startDate = new Date('2024-01-25');
    const endDate = new Date('2024-01-30');

    const expectedPrice = 1500;

    service.getAccommodationPrice(id, guestNum, startDate, endDate).subscribe(price => {
      expect(price).toEqual(expectedPrice);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/calculatePrice/1?begin=2024-01-25&end=2024-01-30&guestNumber=3`,
    });

    req.flush(expectedPrice);
  });
});

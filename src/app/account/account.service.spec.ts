import { TestBed } from '@angular/core/testing';

import { UserService } from './account.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockUser1} from "../mocks/user.service.mock";

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:8080/api';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call signup and the API should return the user that was registered', () => {

    service.signup(mockUser1).subscribe((data) => {
      expect(data).toEqual(mockUser1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/users/signup`,
    });

    req.flush(mockUser1);
  });


  // it('should call signup and the API should return the user that was registered', () => {
  //
  //   service.signup(mockUser1).subscribe((data) => {
  //     expect(data).toEqual(mockUser1);
  //   });
  //
  //   const req = httpController.expectOne({
  //     method: 'POST',
  //     url: `${url}/users/signup`,
  //   });
  //
  //   req.flush(mockUser1);
  // });

});

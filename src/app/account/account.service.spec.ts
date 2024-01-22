import { TestBed } from '@angular/core/testing';

import { UserService } from './account.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockUser1} from "../mocks/user.service.mock";
import {Account, Address, Role, Status, User} from "./model/model.module";

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


  it('should call update and the API should return the updated user', () => {
    const mockAddress: Address = {
      city: 'MockedCity',
      country: 'MockedCountry',
      address: 'MockedAddress',
    };

    const mockRole: Role = {
      id: 1,
      name: 'ROLE_GUEST',
    };

    const mockRoles: Role[] = [mockRole];

    const mockAccount: Account = {
      username: 'MockedUsername',
      password: 'MockedPassword',
      status: Status.ACTIVE,
      roles: mockRoles,
    };

    const mockUser: User = {
      firstName: 'MockedFirstName',
      lastName: 'MockedLastName',
      address: mockAddress,
      phoneNumber: 'MockedPhoneNumber',
      account: mockAccount,
      picturePath: 'MockedPicturePath',
      id: 5
    };

    service.update(mockUser).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/users/${mockUser.id}`,
    });

    req.flush(mockUser);
  });

});

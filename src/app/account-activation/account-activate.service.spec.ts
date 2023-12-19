import { TestBed } from '@angular/core/testing';

import { AccountActivateService } from './account-activate.service';

describe('AccountActivateService', () => {
  let service: AccountActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

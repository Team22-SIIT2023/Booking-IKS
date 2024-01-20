import { TestBed } from '@angular/core/testing';

import { ReportedUserService } from './reported-user-cards.service';

describe('ReportedUserCardsService', () => {
  let service: ReportedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

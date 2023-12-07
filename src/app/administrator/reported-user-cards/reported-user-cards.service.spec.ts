import { TestBed } from '@angular/core/testing';

import { ReportedUserCardsService } from './reported-user-cards.service';

describe('ReportedUserCardsService', () => {
  let service: ReportedUserCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedUserCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

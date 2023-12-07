import { TestBed } from '@angular/core/testing';

import { CommentAndGradeService } from './administrator.service';

describe('AdministratorService', () => {
  let service: CommentAndGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentAndGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AssessorsService } from './assessors.service';

describe('AssessorsService', () => {
  let service: AssessorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

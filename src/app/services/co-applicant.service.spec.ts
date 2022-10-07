import { TestBed } from '@angular/core/testing';

import { CoApplicantService } from './co-applicant.service';

describe('CoApplicantService', () => {
  let service: CoApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

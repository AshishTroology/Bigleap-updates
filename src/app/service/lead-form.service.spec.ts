import { TestBed } from '@angular/core/testing';

import { LeadFormService } from './lead-form.service';

describe('LeadFormService', () => {
  let service: LeadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

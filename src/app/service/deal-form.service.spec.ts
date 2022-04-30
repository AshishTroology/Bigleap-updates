import { TestBed } from '@angular/core/testing';

import { DealFormService } from './deal-form.service';

describe('DealFormService', () => {
  let service: DealFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

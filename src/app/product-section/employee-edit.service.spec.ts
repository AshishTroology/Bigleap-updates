import { TestBed } from '@angular/core/testing';

import { EmployeeEditService } from './employee-edit.service';

describe('EmployeeEditService', () => {
  let service: EmployeeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

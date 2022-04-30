import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestEditComponent } from './service-request-edit.component';

describe('ServiceRequestEditComponent', () => {
  let component: ServiceRequestEditComponent;
  let fixture: ComponentFixture<ServiceRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenddealComponent } from './senddeal.component';

describe('SenddealComponent', () => {
  let component: SenddealComponent;
  let fixture: ComponentFixture<SenddealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenddealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenddealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

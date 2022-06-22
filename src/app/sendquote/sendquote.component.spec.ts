import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendquoteComponent } from './sendquote.component';

describe('SendquoteComponent', () => {
  let component: SendquoteComponent;
  let fixture: ComponentFixture<SendquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendquoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

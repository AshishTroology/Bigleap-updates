import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolepermissionComponent } from './addrolepermission.component';

describe('AddrolepermissionComponent', () => {
  let component: AddrolepermissionComponent;
  let fixture: ComponentFixture<AddrolepermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrolepermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrolepermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

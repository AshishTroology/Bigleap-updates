import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupListComponent } from './new-group-list.component';

describe('NewGroupListComponent', () => {
  let component: NewGroupListComponent;
  let fixture: ComponentFixture<NewGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

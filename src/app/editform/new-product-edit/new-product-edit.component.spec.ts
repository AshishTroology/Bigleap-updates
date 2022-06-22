import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductEditComponent } from './new-product-edit.component';

describe('NewProductEditComponent', () => {
  let component: NewProductEditComponent;
  let fixture: ComponentFixture<NewProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

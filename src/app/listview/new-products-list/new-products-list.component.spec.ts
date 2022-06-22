import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsListComponent } from './new-products-list.component';

describe('NewProductsListComponent', () => {
  let component: NewProductsListComponent;
  let fixture: ComponentFixture<NewProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonViewComponent } from './sales-person-view.component';

describe('SalesPersonViewComponent', () => {
  let component: SalesPersonViewComponent;
  let fixture: ComponentFixture<SalesPersonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPersonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPersonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

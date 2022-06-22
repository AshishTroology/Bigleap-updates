import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealListviewComponent } from './deal-listview.component';

describe('DealListviewComponent', () => {
  let component: DealListviewComponent;
  let fixture: ComponentFixture<DealListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealListviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

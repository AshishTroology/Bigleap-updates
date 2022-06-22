import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteViewComponent } from './qoute-view.component';

describe('QouteViewComponent', () => {
  let component: QouteViewComponent;
  let fixture: ComponentFixture<QouteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QouteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QouteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

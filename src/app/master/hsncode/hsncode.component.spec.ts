import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsncodeComponent } from './hsncode.component';

describe('HsncodeComponent', () => {
  let component: HsncodeComponent;
  let fixture: ComponentFixture<HsncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HsncodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HsncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

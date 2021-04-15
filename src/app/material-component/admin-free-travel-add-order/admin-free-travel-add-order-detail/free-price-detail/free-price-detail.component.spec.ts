import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreePriceDetailComponent } from './free-price-detail.component';

describe('FreePriceDetailComponent', () => {
  let component: FreePriceDetailComponent;
  let fixture: ComponentFixture<FreePriceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreePriceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreePriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

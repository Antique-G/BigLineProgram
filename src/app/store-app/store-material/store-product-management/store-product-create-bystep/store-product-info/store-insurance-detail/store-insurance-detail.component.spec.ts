import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInsuranceDetailComponent } from './store-insurance-detail.component';

describe('StoreInsuranceDetailComponent', () => {
  let component: StoreInsuranceDetailComponent;
  let fixture: ComponentFixture<StoreInsuranceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInsuranceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreTravelSaleRecordComponent } from './admin-pre-travel-sale-record.component';

describe('AdminPreTravelSaleRecordComponent', () => {
  let component: AdminPreTravelSaleRecordComponent;
  let fixture: ComponentFixture<AdminPreTravelSaleRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreTravelSaleRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreTravelSaleRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

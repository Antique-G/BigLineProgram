import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailSubgroupComponent } from './admin-order-detail-subgroup.component';

describe('AdminOrderDetailSubgroupComponent', () => {
  let component: AdminOrderDetailSubgroupComponent;
  let fixture: ComponentFixture<AdminOrderDetailSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailSubgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupSupplementaryInfoComponent } from './admin-order-group-supplementary-info.component';

describe('AdminOrderGroupSupplementaryInfoComponent', () => {
  let component: AdminOrderGroupSupplementaryInfoComponent;
  let fixture: ComponentFixture<AdminOrderGroupSupplementaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupSupplementaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupSupplementaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

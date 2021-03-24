import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupAddOrderDetailComponent } from './admin-group-add-order-detail.component';

describe('AdminGroupAddOrderDetailComponent', () => {
  let component: AdminGroupAddOrderDetailComponent;
  let fixture: ComponentFixture<AdminGroupAddOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupAddOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupAddOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

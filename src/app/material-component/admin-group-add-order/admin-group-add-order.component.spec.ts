import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupAddOrderComponent } from './admin-group-add-order.component';

describe('AdminGroupAddOrderComponent', () => {
  let component: AdminGroupAddOrderComponent;
  let fixture: ComponentFixture<AdminGroupAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

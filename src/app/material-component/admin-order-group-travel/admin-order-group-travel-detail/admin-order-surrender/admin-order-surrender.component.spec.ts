import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderSurrenderComponent } from './admin-order-surrender.component';

describe('AdminOrderSurrenderComponent', () => {
  let component: AdminOrderSurrenderComponent;
  let fixture: ComponentFixture<AdminOrderSurrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderSurrenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderSurrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

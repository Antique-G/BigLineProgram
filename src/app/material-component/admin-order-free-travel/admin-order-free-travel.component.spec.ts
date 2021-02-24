import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFreeTravelComponent } from './admin-order-free-travel.component';

describe('AdminOrderFreeTravelComponent', () => {
  let component: AdminOrderFreeTravelComponent;
  let fixture: ComponentFixture<AdminOrderFreeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderFreeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderFreeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

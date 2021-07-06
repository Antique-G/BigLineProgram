import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupOprateLogComponent } from './admin-order-group-oprate-log.component';

describe('AdminOrderGroupOprateLogComponent', () => {
  let component: AdminOrderGroupOprateLogComponent;
  let fixture: ComponentFixture<AdminOrderGroupOprateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupOprateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupOprateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

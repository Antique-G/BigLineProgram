import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProSupplyComponent } from './admin-pro-supply.component';

describe('AdminProSupplyComponent', () => {
  let component: AdminProSupplyComponent;
  let fixture: ComponentFixture<AdminProSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

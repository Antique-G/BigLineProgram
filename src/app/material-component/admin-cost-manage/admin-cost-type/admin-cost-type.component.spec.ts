import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCostTypeComponent } from './admin-cost-type.component';

describe('AdminCostTypeComponent', () => {
  let component: AdminCostTypeComponent;
  let fixture: ComponentFixture<AdminCostTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCostTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

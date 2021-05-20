import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCostTypeCreateComponent } from './admin-cost-type-create.component';

describe('AdminCostTypeCreateComponent', () => {
  let component: AdminCostTypeCreateComponent;
  let fixture: ComponentFixture<AdminCostTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCostTypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCostTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

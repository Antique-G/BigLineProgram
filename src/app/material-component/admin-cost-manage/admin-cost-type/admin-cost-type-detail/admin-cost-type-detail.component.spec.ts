import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCostTypeDetailComponent } from './admin-cost-type-detail.component';

describe('AdminCostTypeDetailComponent', () => {
  let component: AdminCostTypeDetailComponent;
  let fixture: ComponentFixture<AdminCostTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCostTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCostTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProSupplyDetailComponent } from './admin-pro-supply-detail.component';

describe('AdminProSupplyDetailComponent', () => {
  let component: AdminProSupplyDetailComponent;
  let fixture: ComponentFixture<AdminProSupplyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProSupplyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProSupplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

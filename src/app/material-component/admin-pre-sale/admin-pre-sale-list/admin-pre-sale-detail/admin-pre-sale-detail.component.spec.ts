import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreSaleDetailComponent } from './admin-pre-sale-detail.component';

describe('AdminPreSaleDetailComponent', () => {
  let component: AdminPreSaleDetailComponent;
  let fixture: ComponentFixture<AdminPreSaleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreSaleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreSaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

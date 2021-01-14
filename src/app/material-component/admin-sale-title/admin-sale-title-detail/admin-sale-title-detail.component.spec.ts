import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaleTitleDetailComponent } from './admin-sale-title-detail.component';

describe('AdminSaleTitleDetailComponent', () => {
  let component: AdminSaleTitleDetailComponent;
  let fixture: ComponentFixture<AdminSaleTitleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaleTitleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSaleTitleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

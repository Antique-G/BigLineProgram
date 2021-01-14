import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaleTitleStatusComponent } from './admin-sale-title-status.component';

describe('AdminSaleTitleStatusComponent', () => {
  let component: AdminSaleTitleStatusComponent;
  let fixture: ComponentFixture<AdminSaleTitleStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaleTitleStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSaleTitleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

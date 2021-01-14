import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaleTitleCreateComponent } from './admin-sale-title-create.component';

describe('AdminSaleTitleCreateComponent', () => {
  let component: AdminSaleTitleCreateComponent;
  let fixture: ComponentFixture<AdminSaleTitleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaleTitleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSaleTitleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

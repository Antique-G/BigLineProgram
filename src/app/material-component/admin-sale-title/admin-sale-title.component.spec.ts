import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaleTitleComponent } from './admin-sale-title.component';

describe('AdminSaleTitleComponent', () => {
  let component: AdminSaleTitleComponent;
  let fixture: ComponentFixture<AdminSaleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaleTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSaleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

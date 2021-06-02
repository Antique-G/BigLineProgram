import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreAppointDetailComponent } from './admin-pre-appoint-detail.component';

describe('AdminPreAppointDetailComponent', () => {
  let component: AdminPreAppointDetailComponent;
  let fixture: ComponentFixture<AdminPreAppointDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreAppointDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreAppointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

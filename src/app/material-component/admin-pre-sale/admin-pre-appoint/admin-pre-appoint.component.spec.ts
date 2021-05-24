import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreAppointComponent } from './admin-pre-appoint.component';

describe('AdminPreAppointComponent', () => {
  let component: AdminPreAppointComponent;
  let fixture: ComponentFixture<AdminPreAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

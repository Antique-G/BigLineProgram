import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiComponent } from './admin-store-certifi.component';

describe('AdminStoreCertifiComponent', () => {
  let component: AdminStoreCertifiComponent;
  let fixture: ComponentFixture<AdminStoreCertifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

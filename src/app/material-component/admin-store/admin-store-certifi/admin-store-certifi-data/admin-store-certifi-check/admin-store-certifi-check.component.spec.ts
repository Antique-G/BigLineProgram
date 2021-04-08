import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiCheckComponent } from './admin-store-certifi-check.component';

describe('AdminStoreCertifiCheckComponent', () => {
  let component: AdminStoreCertifiCheckComponent;
  let fixture: ComponentFixture<AdminStoreCertifiCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

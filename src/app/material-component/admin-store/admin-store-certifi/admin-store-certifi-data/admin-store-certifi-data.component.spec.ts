import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiDataComponent } from './admin-store-certifi-data.component';

describe('AdminStoreCertifiDataComponent', () => {
  let component: AdminStoreCertifiDataComponent;
  let fixture: ComponentFixture<AdminStoreCertifiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

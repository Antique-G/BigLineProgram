import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiContracrComponent } from './admin-store-certifi-contracr.component';

describe('AdminStoreCertifiContracrComponent', () => {
  let component: AdminStoreCertifiContracrComponent;
  let fixture: ComponentFixture<AdminStoreCertifiContracrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiContracrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiContracrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

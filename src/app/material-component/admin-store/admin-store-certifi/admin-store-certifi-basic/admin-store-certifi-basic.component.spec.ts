import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiBasicComponent } from './admin-store-certifi-basic.component';

describe('AdminStoreCertifiBasicComponent', () => {
  let component: AdminStoreCertifiBasicComponent;
  let fixture: ComponentFixture<AdminStoreCertifiBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

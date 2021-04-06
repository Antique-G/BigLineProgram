import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiProgressComponent } from './admin-store-certifi-progress.component';

describe('AdminStoreCertifiProgressComponent', () => {
  let component: AdminStoreCertifiProgressComponent;
  let fixture: ComponentFixture<AdminStoreCertifiProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

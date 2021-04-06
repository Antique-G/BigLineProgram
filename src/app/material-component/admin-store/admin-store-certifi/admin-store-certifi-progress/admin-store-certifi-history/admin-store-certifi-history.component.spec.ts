import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCertifiHistoryComponent } from './admin-store-certifi-history.component';

describe('AdminStoreCertifiHistoryComponent', () => {
  let component: AdminStoreCertifiHistoryComponent;
  let fixture: ComponentFixture<AdminStoreCertifiHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCertifiHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCertifiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

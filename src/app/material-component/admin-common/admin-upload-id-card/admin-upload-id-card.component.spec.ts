import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadIdCardComponent } from './admin-upload-id-card.component';

describe('AdminUploadIdCardComponent', () => {
  let component: AdminUploadIdCardComponent;
  let fixture: ComponentFixture<AdminUploadIdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUploadIdCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

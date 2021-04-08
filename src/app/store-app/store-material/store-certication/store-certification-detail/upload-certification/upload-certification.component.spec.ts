import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertificationComponent } from './upload-certification.component';

describe('UploadCertificationComponent', () => {
  let component: UploadCertificationComponent;
  let fixture: ComponentFixture<UploadCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

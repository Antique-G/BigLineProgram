import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIdCardComponent } from './upload-id-card.component';

describe('UploadIdCardComponent', () => {
  let component: UploadIdCardComponent;
  let fixture: ComponentFixture<UploadIdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadIdCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

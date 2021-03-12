import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeDetailUploadStrokeComponent } from './store-free-detail-upload-stroke.component';

describe('StoreFreeDetailUploadStrokeComponent', () => {
  let component: StoreFreeDetailUploadStrokeComponent;
  let fixture: ComponentFixture<StoreFreeDetailUploadStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeDetailUploadStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeDetailUploadStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeUploadStrokeComponent } from './store-free-upload-stroke.component';

describe('StoreFreeUploadStrokeComponent', () => {
  let component: StoreFreeUploadStrokeComponent;
  let fixture: ComponentFixture<StoreFreeUploadStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeUploadStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeUploadStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMeetingPlaceDetailComponent } from './store-meeting-place-detail.component';

describe('StoreMeetingPlaceDetailComponent', () => {
  let component: StoreMeetingPlaceDetailComponent;
  let fixture: ComponentFixture<StoreMeetingPlaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreMeetingPlaceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMeetingPlaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

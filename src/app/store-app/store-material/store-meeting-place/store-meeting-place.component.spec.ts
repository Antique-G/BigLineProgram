import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMeetingPlaceComponent } from './store-meeting-place.component';

describe('StoreMeetingPlaceComponent', () => {
  let component: StoreMeetingPlaceComponent;
  let fixture: ComponentFixture<StoreMeetingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreMeetingPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMeetingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

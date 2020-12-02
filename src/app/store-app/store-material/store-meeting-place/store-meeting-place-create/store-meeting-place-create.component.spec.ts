import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMeetingPlaceCreateComponent } from './store-meeting-place-create.component';

describe('StoreMeetingPlaceCreateComponent', () => {
  let component: StoreMeetingPlaceCreateComponent;
  let fixture: ComponentFixture<StoreMeetingPlaceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreMeetingPlaceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMeetingPlaceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTouristComponent } from './store-tourist.component';

describe('StoreTouristComponent', () => {
  let component: StoreTouristComponent;
  let fixture: ComponentFixture<StoreTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTouristComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

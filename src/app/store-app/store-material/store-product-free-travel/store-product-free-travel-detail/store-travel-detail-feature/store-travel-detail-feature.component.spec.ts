import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailFeatureComponent } from './store-travel-detail-feature.component';

describe('StoreTravelDetailFeatureComponent', () => {
  let component: StoreTravelDetailFeatureComponent;
  let fixture: ComponentFixture<StoreTravelDetailFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

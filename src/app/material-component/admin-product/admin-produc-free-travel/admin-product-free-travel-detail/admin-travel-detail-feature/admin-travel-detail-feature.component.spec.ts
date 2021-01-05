import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailFeatureComponent } from './admin-travel-detail-feature.component';

describe('AdminTravelDetailFeatureComponent', () => {
  let component: AdminTravelDetailFeatureComponent;
  let fixture: ComponentFixture<AdminTravelDetailFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailProinfoComponent } from './admin-travel-detail-proinfo.component';

describe('AdminTravelDetailProinfoComponent', () => {
  let component: AdminTravelDetailProinfoComponent;
  let fixture: ComponentFixture<AdminTravelDetailProinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailProinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailProinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

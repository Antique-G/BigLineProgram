import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailPresellComponent } from './admin-travel-detail-presell.component';

describe('AdminTravelDetailPresellComponent', () => {
  let component: AdminTravelDetailPresellComponent;
  let fixture: ComponentFixture<AdminTravelDetailPresellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailPresellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailPresellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

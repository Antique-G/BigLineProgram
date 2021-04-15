import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailPostComponent } from './admin-travel-detail-post.component';

describe('AdminTravelDetailPostComponent', () => {
  let component: AdminTravelDetailPostComponent;
  let fixture: ComponentFixture<AdminTravelDetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTouristDetailComponent } from './admin-tourist-detail.component';

describe('AdminTouristDetailComponent', () => {
  let component: AdminTouristDetailComponent;
  let fixture: ComponentFixture<AdminTouristDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTouristDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTouristDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

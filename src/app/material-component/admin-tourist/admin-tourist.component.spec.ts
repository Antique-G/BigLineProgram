import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTouristComponent } from './admin-tourist.component';

describe('AdminTouristComponent', () => {
  let component: AdminTouristComponent;
  let fixture: ComponentFixture<AdminTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTouristComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

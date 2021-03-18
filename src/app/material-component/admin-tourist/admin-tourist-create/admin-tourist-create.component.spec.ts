import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTouristCreateComponent } from './admin-tourist-create.component';

describe('AdminTouristCreateComponent', () => {
  let component: AdminTouristCreateComponent;
  let fixture: ComponentFixture<AdminTouristCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTouristCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTouristCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemAreaSecondComponent } from './admin-system-area-second.component';

describe('AdminSystemAreaSecondComponent', () => {
  let component: AdminSystemAreaSecondComponent;
  let fixture: ComponentFixture<AdminSystemAreaSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemAreaSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemAreaSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

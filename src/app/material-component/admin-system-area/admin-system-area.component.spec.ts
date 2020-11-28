import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemAreaComponent } from './admin-system-area.component';

describe('AdminSystemAreaComponent', () => {
  let component: AdminSystemAreaComponent;
  let fixture: ComponentFixture<AdminSystemAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

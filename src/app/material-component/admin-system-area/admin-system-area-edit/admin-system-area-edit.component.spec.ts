import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemAreaEditComponent } from './admin-system-area-edit.component';

describe('AdminSystemAreaEditComponent', () => {
  let component: AdminSystemAreaEditComponent;
  let fixture: ComponentFixture<AdminSystemAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemAreaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNullComponent } from './admin-null.component';

describe('AdminNullComponent', () => {
  let component: AdminNullComponent;
  let fixture: ComponentFixture<AdminNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

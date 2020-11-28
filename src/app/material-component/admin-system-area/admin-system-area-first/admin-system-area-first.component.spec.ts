import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemAreaFirstComponent } from './admin-system-area-first.component';

describe('AdminSystemAreaFirstComponent', () => {
  let component: AdminSystemAreaFirstComponent;
  let fixture: ComponentFixture<AdminSystemAreaFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemAreaFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemAreaFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

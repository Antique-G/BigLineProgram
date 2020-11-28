import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemAreaCreateComponent } from './admin-system-area-create.component';

describe('AdminSystemAreaCreateComponent', () => {
  let component: AdminSystemAreaCreateComponent;
  let fixture: ComponentFixture<AdminSystemAreaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemAreaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemAreaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

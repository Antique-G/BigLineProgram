import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicerComponent } from './admin-servicer.component';

describe('AdminServicerComponent', () => {
  let component: AdminServicerComponent;
  let fixture: ComponentFixture<AdminServicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServicerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

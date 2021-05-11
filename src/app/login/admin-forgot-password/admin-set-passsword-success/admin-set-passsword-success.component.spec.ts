import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetPassswordSuccessComponent } from './admin-set-passsword-success.component';

describe('AdminSetPassswordSuccessComponent', () => {
  let component: AdminSetPassswordSuccessComponent;
  let fixture: ComponentFixture<AdminSetPassswordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetPassswordSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetPassswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

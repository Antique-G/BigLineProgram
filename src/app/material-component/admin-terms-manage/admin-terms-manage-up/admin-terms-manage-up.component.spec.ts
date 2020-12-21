import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermsManageUpComponent } from './admin-terms-manage-up.component';

describe('AdminTermsManageUpComponent', () => {
  let component: AdminTermsManageUpComponent;
  let fixture: ComponentFixture<AdminTermsManageUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermsManageUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermsManageUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

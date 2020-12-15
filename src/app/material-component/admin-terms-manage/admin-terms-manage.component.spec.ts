import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermsManageComponent } from './admin-terms-manage.component';

describe('AdminTermsManageComponent', () => {
  let component: AdminTermsManageComponent;
  let fixture: ComponentFixture<AdminTermsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

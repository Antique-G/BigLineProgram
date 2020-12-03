import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreAccountDetailComponent } from './admin-store-account-detail.component';

describe('AdminStoreAccountDetailComponent', () => {
  let component: AdminStoreAccountDetailComponent;
  let fixture: ComponentFixture<AdminStoreAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

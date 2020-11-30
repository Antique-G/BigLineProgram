import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreDetailComponent } from './admin-store-detail.component';

describe('AdminStoreDetailComponent', () => {
  let component: AdminStoreDetailComponent;
  let fixture: ComponentFixture<AdminStoreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

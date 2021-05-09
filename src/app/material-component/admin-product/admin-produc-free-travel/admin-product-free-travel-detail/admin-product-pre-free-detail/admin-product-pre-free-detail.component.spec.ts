import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductPreFreeDetailComponent } from './admin-product-pre-free-detail.component';

describe('AdminProductPreFreeDetailComponent', () => {
  let component: AdminProductPreFreeDetailComponent;
  let fixture: ComponentFixture<AdminProductPreFreeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductPreFreeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductPreFreeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

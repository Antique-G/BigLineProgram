import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductPreFreeComponent } from './admin-product-pre-free.component';

describe('AdminProductPreFreeComponent', () => {
  let component: AdminProductPreFreeComponent;
  let fixture: ComponentFixture<AdminProductPreFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductPreFreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductPreFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

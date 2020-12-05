import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductTagDetailComponent } from './admin-product-tag-detail.component';

describe('AdminProductTagDetailComponent', () => {
  let component: AdminProductTagDetailComponent;
  let fixture: ComponentFixture<AdminProductTagDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductTagDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductTagDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

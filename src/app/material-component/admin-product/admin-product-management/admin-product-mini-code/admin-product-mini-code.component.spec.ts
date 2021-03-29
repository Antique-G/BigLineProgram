import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductMiniCodeComponent } from './admin-product-mini-code.component';

describe('AdminProductMiniCodeComponent', () => {
  let component: AdminProductMiniCodeComponent;
  let fixture: ComponentFixture<AdminProductMiniCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductMiniCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductMiniCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

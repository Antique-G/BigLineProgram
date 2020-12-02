import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductTagCreateComponent } from './admin-product-tag-create.component';

describe('AdminProductTagCreateComponent', () => {
  let component: AdminProductTagCreateComponent;
  let fixture: ComponentFixture<AdminProductTagCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductTagCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductTagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

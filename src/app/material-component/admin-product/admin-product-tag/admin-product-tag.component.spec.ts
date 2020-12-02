import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductTagComponent } from './admin-product-tag.component';

describe('AdminProductTagComponent', () => {
  let component: AdminProductTagComponent;
  let fixture: ComponentFixture<AdminProductTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

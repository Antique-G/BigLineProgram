import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAreaCreateComponent } from './admin-product-area-create.component';

describe('AdminProductAreaCreateComponent', () => {
  let component: AdminProductAreaCreateComponent;
  let fixture: ComponentFixture<AdminProductAreaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAreaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAreaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

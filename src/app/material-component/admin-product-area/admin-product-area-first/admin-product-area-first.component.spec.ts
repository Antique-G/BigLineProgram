import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAreaFirstComponent } from './admin-product-area-first.component';

describe('AdminProductAreaFirstComponent', () => {
  let component: AdminProductAreaFirstComponent;
  let fixture: ComponentFixture<AdminProductAreaFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAreaFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAreaFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

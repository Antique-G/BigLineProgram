import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductQutedateComponent } from './admin-product-qutedate.component';

describe('AdminProductQutedateComponent', () => {
  let component: AdminProductQutedateComponent;
  let fixture: ComponentFixture<AdminProductQutedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductQutedateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductQutedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

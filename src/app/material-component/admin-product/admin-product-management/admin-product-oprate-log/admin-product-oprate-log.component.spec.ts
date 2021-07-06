import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductOprateLogComponent } from './admin-product-oprate-log.component';

describe('AdminProductOprateLogComponent', () => {
  let component: AdminProductOprateLogComponent;
  let fixture: ComponentFixture<AdminProductOprateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductOprateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductOprateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

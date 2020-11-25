import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCreateComponent } from './admin-store-create.component';

describe('AdminStoreCreateComponent', () => {
  let component: AdminStoreCreateComponent;
  let fixture: ComponentFixture<AdminStoreCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

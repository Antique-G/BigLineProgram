import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreCommissComponent } from './admin-store-commiss.component';

describe('AdminStoreCommissComponent', () => {
  let component: AdminStoreCommissComponent;
  let fixture: ComponentFixture<AdminStoreCommissComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreCommissComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreCommissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

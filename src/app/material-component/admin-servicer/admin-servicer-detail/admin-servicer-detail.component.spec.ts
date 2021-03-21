import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicerDetailComponent } from './admin-servicer-detail.component';

describe('AdminServicerDetailComponent', () => {
  let component: AdminServicerDetailComponent;
  let fixture: ComponentFixture<AdminServicerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServicerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

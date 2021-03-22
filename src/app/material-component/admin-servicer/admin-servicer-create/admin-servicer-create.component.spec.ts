import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicerCreateComponent } from './admin-servicer-create.component';

describe('AdminServicerCreateComponent', () => {
  let component: AdminServicerCreateComponent;
  let fixture: ComponentFixture<AdminServicerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServicerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

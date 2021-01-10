import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermTemplateEditComponent } from './admin-term-template-edit.component';

describe('AdminTermTemplateEditComponent', () => {
  let component: AdminTermTemplateEditComponent;
  let fixture: ComponentFixture<AdminTermTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermTemplateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

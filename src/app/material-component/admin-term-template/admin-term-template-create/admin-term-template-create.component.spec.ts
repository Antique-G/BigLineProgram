import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermTemplateCreateComponent } from './admin-term-template-create.component';

describe('AdminTermTemplateCreateComponent', () => {
  let component: AdminTermTemplateCreateComponent;
  let fixture: ComponentFixture<AdminTermTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermTemplateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

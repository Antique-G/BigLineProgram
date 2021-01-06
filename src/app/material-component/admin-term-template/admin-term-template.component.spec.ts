import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermTemplateComponent } from './admin-term-template.component';

describe('AdminTermTemplateComponent', () => {
  let component: AdminTermTemplateComponent;
  let fixture: ComponentFixture<AdminTermTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

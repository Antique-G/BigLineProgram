import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailEditornoticeComponent } from './admin-travel-detail-editornotice.component';

describe('AdminTravelDetailEditornoticeComponent', () => {
  let component: AdminTravelDetailEditornoticeComponent;
  let fixture: ComponentFixture<AdminTravelDetailEditornoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailEditornoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailEditornoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

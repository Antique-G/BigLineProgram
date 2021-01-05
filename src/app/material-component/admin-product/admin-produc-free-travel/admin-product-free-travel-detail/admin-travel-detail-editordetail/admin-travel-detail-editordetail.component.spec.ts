import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelDetailEditordetailComponent } from './admin-travel-detail-editordetail.component';

describe('AdminTravelDetailEditordetailComponent', () => {
  let component: AdminTravelDetailEditordetailComponent;
  let fixture: ComponentFixture<AdminTravelDetailEditordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelDetailEditordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelDetailEditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

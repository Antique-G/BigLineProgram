import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChooseImgComponent } from './admin-choose-img.component';

describe('AdminChooseImgComponent', () => {
  let component: AdminChooseImgComponent;
  let fixture: ComponentFixture<AdminChooseImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChooseImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChooseImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

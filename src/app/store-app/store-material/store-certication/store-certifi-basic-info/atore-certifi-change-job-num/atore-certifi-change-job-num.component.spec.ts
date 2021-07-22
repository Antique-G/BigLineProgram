import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtoreCertifiChangeJobNumComponent } from './atore-certifi-change-job-num.component';

describe('AtoreCertifiChangeJobNumComponent', () => {
  let component: AtoreCertifiChangeJobNumComponent;
  let fixture: ComponentFixture<AtoreCertifiChangeJobNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtoreCertifiChangeJobNumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtoreCertifiChangeJobNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertificationDetailComponent } from './store-certification-detail.component';

describe('StoreCertificationDetailComponent', () => {
  let component: StoreCertificationDetailComponent;
  let fixture: ComponentFixture<StoreCertificationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertificationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

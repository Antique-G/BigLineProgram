import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertifiProgressComponent } from './store-certifi-progress.component';

describe('StoreCertifiProgressComponent', () => {
  let component: StoreCertifiProgressComponent;
  let fixture: ComponentFixture<StoreCertifiProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertifiProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertifiProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

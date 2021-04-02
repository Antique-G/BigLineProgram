import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertifiBasicInfoComponent } from './store-certifi-basic-info.component';

describe('StoreCertifiBasicInfoComponent', () => {
  let component: StoreCertifiBasicInfoComponent;
  let fixture: ComponentFixture<StoreCertifiBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertifiBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertifiBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

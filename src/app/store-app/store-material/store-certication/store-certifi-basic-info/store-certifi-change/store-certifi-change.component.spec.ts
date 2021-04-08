import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertifiChangeComponent } from './store-certifi-change.component';

describe('StoreCertifiChangeComponent', () => {
  let component: StoreCertifiChangeComponent;
  let fixture: ComponentFixture<StoreCertifiChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertifiChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertifiChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

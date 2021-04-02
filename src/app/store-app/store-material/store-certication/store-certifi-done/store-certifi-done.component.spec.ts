import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertifiDoneComponent } from './store-certifi-done.component';

describe('StoreCertifiDoneComponent', () => {
  let component: StoreCertifiDoneComponent;
  let fixture: ComponentFixture<StoreCertifiDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertifiDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertifiDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

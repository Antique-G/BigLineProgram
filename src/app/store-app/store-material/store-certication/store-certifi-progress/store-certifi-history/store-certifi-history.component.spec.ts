import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCertifiHistoryComponent } from './store-certifi-history.component';

describe('StoreCertifiHistoryComponent', () => {
  let component: StoreCertifiHistoryComponent;
  let fixture: ComponentFixture<StoreCertifiHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCertifiHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCertifiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

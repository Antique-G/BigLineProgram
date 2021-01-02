import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailProinfoComponent } from './store-travel-detail-proinfo.component';

describe('StoreTravelDetailProinfoComponent', () => {
  let component: StoreTravelDetailProinfoComponent;
  let fixture: ComponentFixture<StoreTravelDetailProinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailProinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailProinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

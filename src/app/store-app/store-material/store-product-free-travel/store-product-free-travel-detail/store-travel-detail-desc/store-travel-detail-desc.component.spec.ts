import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailDescComponent } from './store-travel-detail-desc.component';

describe('StoreTravelDetailDescComponent', () => {
  let component: StoreTravelDetailDescComponent;
  let fixture: ComponentFixture<StoreTravelDetailDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

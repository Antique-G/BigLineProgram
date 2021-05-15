import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailPresellComponent } from './store-travel-detail-presell.component';

describe('StoreTravelDetailPresellComponent', () => {
  let component: StoreTravelDetailPresellComponent;
  let fixture: ComponentFixture<StoreTravelDetailPresellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailPresellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailPresellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

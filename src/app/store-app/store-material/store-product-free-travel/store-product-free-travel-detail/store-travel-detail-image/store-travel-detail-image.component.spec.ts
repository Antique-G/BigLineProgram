import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailImageComponent } from './store-travel-detail-image.component';

describe('StoreTravelDetailImageComponent', () => {
  let component: StoreTravelDetailImageComponent;
  let fixture: ComponentFixture<StoreTravelDetailImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

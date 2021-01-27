import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTouristDetailComponent } from './store-tourist-detail.component';

describe('StoreTouristDetailComponent', () => {
  let component: StoreTouristDetailComponent;
  let fixture: ComponentFixture<StoreTouristDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTouristDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTouristDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

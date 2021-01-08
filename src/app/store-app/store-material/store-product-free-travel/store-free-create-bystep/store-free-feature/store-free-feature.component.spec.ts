import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeFeatureComponent } from './store-free-feature.component';

describe('StoreFreeFeatureComponent', () => {
  let component: StoreFreeFeatureComponent;
  let fixture: ComponentFixture<StoreFreeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

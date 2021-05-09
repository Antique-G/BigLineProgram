import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreFreeInfoComponent } from './store-pre-free-info.component';

describe('StorePreFreeInfoComponent', () => {
  let component: StorePreFreeInfoComponent;
  let fixture: ComponentFixture<StorePreFreeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreFreeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreFreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

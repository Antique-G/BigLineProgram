import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderFreetravelDetailComponent } from './store-order-freetravel-detail.component';

describe('StoreOrderFreetravelDetailComponent', () => {
  let component: StoreOrderFreetravelDetailComponent;
  let fixture: ComponentFixture<StoreOrderFreetravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderFreetravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderFreetravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

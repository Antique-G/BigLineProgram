import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderFreetravelComponent } from './store-order-freetravel.component';

describe('StoreOrderFreetravelComponent', () => {
  let component: StoreOrderFreetravelComponent;
  let fixture: ComponentFixture<StoreOrderFreetravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderFreetravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderFreetravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

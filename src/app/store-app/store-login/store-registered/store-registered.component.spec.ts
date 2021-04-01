import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRegisteredComponent } from './store-registered.component';

describe('StoreRegisteredComponent', () => {
  let component: StoreRegisteredComponent;
  let fixture: ComponentFixture<StoreRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

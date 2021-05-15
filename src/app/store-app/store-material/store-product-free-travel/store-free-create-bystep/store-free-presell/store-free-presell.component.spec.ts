import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreePresellComponent } from './store-free-presell.component';

describe('StoreFreePresellComponent', () => {
  let component: StoreFreePresellComponent;
  let fixture: ComponentFixture<StoreFreePresellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreePresellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreePresellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

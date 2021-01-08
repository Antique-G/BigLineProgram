import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeDescComponent } from './store-free-desc.component';

describe('StoreFreeDescComponent', () => {
  let component: StoreFreeDescComponent;
  let fixture: ComponentFixture<StoreFreeDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

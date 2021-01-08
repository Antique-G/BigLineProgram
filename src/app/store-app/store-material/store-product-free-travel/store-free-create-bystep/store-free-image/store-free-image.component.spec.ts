import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeImageComponent } from './store-free-image.component';

describe('StoreFreeImageComponent', () => {
  let component: StoreFreeImageComponent;
  let fixture: ComponentFixture<StoreFreeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

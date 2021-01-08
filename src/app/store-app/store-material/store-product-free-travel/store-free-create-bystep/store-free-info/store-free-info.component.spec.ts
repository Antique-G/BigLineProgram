import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeInfoComponent } from './store-free-info.component';

describe('StoreFreeInfoComponent', () => {
  let component: StoreFreeInfoComponent;
  let fixture: ComponentFixture<StoreFreeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

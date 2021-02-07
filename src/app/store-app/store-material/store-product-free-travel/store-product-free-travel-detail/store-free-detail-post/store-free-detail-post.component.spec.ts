import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeDetailPostComponent } from './store-free-detail-post.component';

describe('StoreFreeDetailPostComponent', () => {
  let component: StoreFreeDetailPostComponent;
  let fixture: ComponentFixture<StoreFreeDetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeDetailPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

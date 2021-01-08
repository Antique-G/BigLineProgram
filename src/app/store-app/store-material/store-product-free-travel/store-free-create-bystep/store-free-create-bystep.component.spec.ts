import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeCreateBystepComponent } from './store-free-create-bystep.component';

describe('StoreFreeCreateBystepComponent', () => {
  let component: StoreFreeCreateBystepComponent;
  let fixture: ComponentFixture<StoreFreeCreateBystepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeCreateBystepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeCreateBystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

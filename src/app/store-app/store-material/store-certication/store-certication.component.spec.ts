import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCerticationComponent } from './store-certication.component';

describe('StoreCerticationComponent', () => {
  let component: StoreCerticationComponent;
  let fixture: ComponentFixture<StoreCerticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCerticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCerticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTemplateExampleComponent } from './store-template-example.component';

describe('StoreTemplateExampleComponent', () => {
  let component: StoreTemplateExampleComponent;
  let fixture: ComponentFixture<StoreTemplateExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTemplateExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTemplateExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

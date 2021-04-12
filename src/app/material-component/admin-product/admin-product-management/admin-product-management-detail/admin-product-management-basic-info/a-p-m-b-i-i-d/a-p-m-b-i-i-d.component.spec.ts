import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APMBIIDComponent } from './a-p-m-b-i-i-d.component';

describe('APMBIIDComponent', () => {
  let component: APMBIIDComponent;
  let fixture: ComponentFixture<APMBIIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APMBIIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APMBIIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

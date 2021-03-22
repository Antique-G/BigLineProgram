import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AODSubgroupMoveorderComponent } from './a-o-d-subgroup-moveorder.component';

describe('AODSubgroupMoveorderComponent', () => {
  let component: AODSubgroupMoveorderComponent;
  let fixture: ComponentFixture<AODSubgroupMoveorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AODSubgroupMoveorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AODSubgroupMoveorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

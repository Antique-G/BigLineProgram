import { TestBed } from '@angular/core/testing';

import { AdminFinaceGroupService } from './admin-finace-group.service';

describe('AdminFinaceGroupService', () => {
  let service: AdminFinaceGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFinaceGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

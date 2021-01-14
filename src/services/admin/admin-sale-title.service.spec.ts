import { TestBed } from '@angular/core/testing';

import { AdminSaleTitleService } from './admin-sale-title.service';

describe('AdminSaleTitleService', () => {
  let service: AdminSaleTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSaleTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

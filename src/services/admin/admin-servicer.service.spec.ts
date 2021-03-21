import { TestBed } from '@angular/core/testing';

import { AdminServicerService } from './admin-servicer.service';

describe('AdminServicerService', () => {
  let service: AdminServicerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServicerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

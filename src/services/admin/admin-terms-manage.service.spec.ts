import { TestBed } from '@angular/core/testing';

import { AdminTermsManageService } from './admin-terms-manage.service';

describe('AdminTermsManageService', () => {
  let service: AdminTermsManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTermsManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

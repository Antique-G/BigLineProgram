import { TestBed } from '@angular/core/testing';

import { AdminProductTagService } from './admin-product-tag.service';

describe('AdminProductTagService', () => {
  let service: AdminProductTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

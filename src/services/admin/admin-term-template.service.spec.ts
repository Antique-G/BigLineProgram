import { TestBed } from '@angular/core/testing';

import { AdminTermTemplateService } from './admin-term-template.service';

describe('AdminTermTemplateService', () => {
  let service: AdminTermTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTermTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

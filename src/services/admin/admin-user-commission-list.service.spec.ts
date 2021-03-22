/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminUserCommissionListService } from './admin-user-commission-list.service';

describe('Service: AdminUserCommissionList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUserCommissionListService]
    });
  });

  it('should ...', inject([AdminUserCommissionListService], (service: AdminUserCommissionListService) => {
    expect(service).toBeTruthy();
  }));
});

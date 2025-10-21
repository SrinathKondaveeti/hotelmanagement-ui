import { TestBed } from '@angular/core/testing';

import { LayoutManagementService } from './layout-management.service';

describe('LayoutManagementService', () => {
  let service: LayoutManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

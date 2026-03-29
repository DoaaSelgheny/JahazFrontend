import { TestBed } from '@angular/core/testing';

import { ManageCustomersService } from './manage-customers.service';

describe('ManageCustomersService', () => {
  let service: ManageCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

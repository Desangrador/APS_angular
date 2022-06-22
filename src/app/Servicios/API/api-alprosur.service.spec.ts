import { TestBed } from '@angular/core/testing';

import { ApiAlprosurService } from './api-alprosur.service';

describe('ApiAlprosurService', () => {
  let service: ApiAlprosurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlprosurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

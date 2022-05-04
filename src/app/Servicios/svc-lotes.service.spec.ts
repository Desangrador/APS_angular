import { TestBed } from '@angular/core/testing';

import { SvcLotesService } from './svc-lotes.service';

describe('SvcLotesService', () => {
  let service: SvcLotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvcLotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

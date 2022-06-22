import { TestBed } from '@angular/core/testing';

import { SvcClientesService } from './svc-clientes.service';

describe('SvcClientesService', () => {
  let service: SvcClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvcClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

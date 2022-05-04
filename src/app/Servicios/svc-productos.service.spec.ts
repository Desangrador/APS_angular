import { TestBed } from '@angular/core/testing';

import { SvcProductosService } from './svc-productos.service';

describe('SvcProductosService', () => {
  let service: SvcProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvcProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

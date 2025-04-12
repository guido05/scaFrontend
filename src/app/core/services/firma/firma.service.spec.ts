import { TestBed } from '@angular/core/testing';

import { FirmaService } from './firma.service';

describe('FirmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirmaService = TestBed.get(FirmaService);
    expect(service).toBeTruthy();
  });
});

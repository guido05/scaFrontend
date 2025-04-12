import { TestBed } from '@angular/core/testing';

import { SueldoBasicoService } from './sueldoBasico.service';

describe('SueldoBasicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SueldoBasicoService = TestBed.get(SueldoBasicoService);
    expect(service).toBeTruthy();
  });
});

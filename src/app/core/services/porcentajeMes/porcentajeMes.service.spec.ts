import { TestBed } from '@angular/core/testing';

import { PorcentajeMesService } from './porcentajeMes.service';

describe('PorcentajeMesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorcentajeMesService = TestBed.get(PorcentajeMesService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AsociadoCondicionService } from './asociadoCondicion.service';

describe('AsociadoCondicionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsociadoCondicionService = TestBed.get(AsociadoCondicionService);
    expect(service).toBeTruthy();
  });
});

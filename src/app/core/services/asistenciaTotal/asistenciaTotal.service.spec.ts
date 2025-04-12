import { TestBed } from '@angular/core/testing';

import { AsistenciaTotalService } from './asistenciaTotal.service';

describe('AsistenciaTotalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenciaTotalService = TestBed.get(AsistenciaTotalService);
    expect(service).toBeTruthy();
  });
});

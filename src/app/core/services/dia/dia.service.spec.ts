import { TestBed } from '@angular/core/testing';

import { DiaService } from './dia.service';

describe('DiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaService = TestBed.get(DiaService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { MesService } from './mes.service';

describe('ProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesService = TestBed.get(MesService);
    expect(service).toBeTruthy();
  });
});

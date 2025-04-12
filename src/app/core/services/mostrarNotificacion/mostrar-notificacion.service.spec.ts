import { TestBed } from '@angular/core/testing';

import { MostrarNotificacionService } from './mostrar-notificacion.service';

describe('MostrarNotificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MostrarNotificacionService = TestBed.get(MostrarNotificacionService);
    expect(service).toBeTruthy();
  });
});

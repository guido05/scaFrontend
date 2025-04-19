export class Asistencia {
    id: string;
    id_condicion: string;
    id_asociado: string;
    horaEntrada: string;
    horaSalida: string;
    fecha: string;
    observacion:string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asistencia?) {
        asistencia = asistencia || {};
        this.id = asistencia.id || '';
        this.id_condicion = asistencia.id_condicion || '';
        this.id_asociado = asistencia.id_asociado || '';
        this.horaEntrada = asistencia.horaEntrada || '';
        this.horaSalida = asistencia.horaSalida || '';
        this.fecha = asistencia.fecha || '';
        this.observacion = asistencia.observacion || '';
    }

}
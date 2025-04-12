export class Asistencia {
    id: string;
    id_condicion: string;
    id_asistencia: string;
    id_dia: string;
    horaEntrada: string;
    horaSalida: string;
    fecha: string;
    observacion:string;
    subtotal: string

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asistencia?) {
        asistencia = asistencia || {};
        this.id = asistencia.id || '';
        this.id_condicion = asistencia.id_condicion || '';
        this.id_asistencia = asistencia.id_asistencia || '';
        this.id_dia = asistencia.id_dia || '';
        this.horaEntrada = asistencia.horaEntrada || '';
        this.horaSalida = asistencia.horaSalida || '';
        this.fecha = asistencia.fecha || '';
        this.observacion = asistencia.observacion || '';
        this.subtotal = asistencia.subtotal || '';
    }

}
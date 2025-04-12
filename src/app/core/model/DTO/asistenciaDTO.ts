export class AsistenciaDTO {
     activo: string;
     apellido: string;
     documento: string;
     nombre: string;
     legajo: string;
     telefono: string;
     id_firma: string;
     codigo: string;
     fecha: string;
     hora_entrada: string;
     hora_salida: string;
     fecha_hora: string;
     condicion: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asistenciaDTO?) {
        asistenciaDTO = asistenciaDTO || {};
        this.activo = asistenciaDTO.activo || '';
        this.apellido = asistenciaDTO.apellido || '';
        this.documento = asistenciaDTO.documento || '';
        this.nombre = asistenciaDTO.nombre || '';
        this.legajo = asistenciaDTO.legajo || '';
        this.telefono = asistenciaDTO.telefono || '';
        this.id_firma = asistenciaDTO.id_firma || '';
        this.codigo = asistenciaDTO.codigo || '';
        this.fecha = asistenciaDTO.fecha || '';
        this.hora_entrada = asistenciaDTO.hora_entrada || '';
        this.hora_salida = asistenciaDTO.hora_salida || '';
        this.fecha_hora = asistenciaDTO.fecha_hora || '';
        this.condicion = asistenciaDTO.condicion || '';
    }

}
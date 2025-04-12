export class AsistenciaTotal {
    id: string;
    id_mes: string;
    ano: string;
    id_asistencia: string;
    tiempo_hora_anual: string;
    tiempo_hora_mensual: string;
    tiempo_hora_primera_quincena: string;
    tiempo_hora_segunda_quincena:string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asistenciaTotal?) {
        asistenciaTotal = asistenciaTotal || {};
        this.id = asistenciaTotal.id || '';
        this.id_mes = asistenciaTotal.id_mes || '';
        this.ano = asistenciaTotal.ano || '';
        this.id_asistencia = asistenciaTotal.id_asistencia || '';
        this.tiempo_hora_anual = asistenciaTotal.tiempo_hora_anual || '';
        this.tiempo_hora_mensual = asistenciaTotal.tiempo_hora_mensual || '';
        this.tiempo_hora_primera_quincena = asistenciaTotal.tiempo_hora_primera_quincena || '';
        this.tiempo_hora_segunda_quincena = asistenciaTotal.tiempo_hora_segunda_quincena || '';
    }

}
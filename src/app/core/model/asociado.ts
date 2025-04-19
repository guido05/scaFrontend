export class Asociado {
    id: string;
    nombre: string;
    apellido: string;
    legajo: string;
    idFirma: string;
    categorias: string;
    telefono: string;
    documento: string;
    activo: number;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asociado?) {
        asociado = asociado || {};
        this.id = asociado.id || '';
        this.nombre = asociado.nombre || '';
        this.apellido = asociado.apellido || '';
        this.legajo = asociado.legajo || '';
        this.idFirma = asociado.idFirma || '';
        this.categorias = asociado.categorias || '';
        this.telefono = asociado.telefono || '';
        this.documento = asociado.documento || '';
        this.activo = asociado.activo || 0;
    }

}

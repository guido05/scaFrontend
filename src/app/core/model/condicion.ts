export class Condicion {
    id: string;
    sigla: string;
    descripcion: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(condicion?) {
        condicion = condicion || {};
        this.id = condicion.id || '';
        this.sigla = condicion.sigla || '';
        this.descripcion = condicion.descripcion || '';
    }

}
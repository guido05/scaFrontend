export class Dia {
    id: string;
    nombre: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(dia?) {
        dia = dia || {};
        this.id = dia.id || '';
        this.nombre = dia.nombre || '';
    }

}
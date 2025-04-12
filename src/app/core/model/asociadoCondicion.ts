export class AsociadoCondicion {
    id: string;
    asociado: string;
    condicion: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(asociadoCondicion?) {
        asociadoCondicion = asociadoCondicion || {};
        this.id = asociadoCondicion.id || '';
        this.asociado = asociadoCondicion.asociado || '';
        this.condicion = asociadoCondicion.condicion || '';
    }

}
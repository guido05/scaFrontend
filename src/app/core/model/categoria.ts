export class Categoria {
    id: string;
    nombre: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(categoria?) {
        categoria = categoria || {};
        this.id = categoria.id || '';
        this.nombre = categoria.nombre || '';
    }

}
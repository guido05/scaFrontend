export class Idioma {
    id: string;
    nombre: string;
    abreviatura: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(idioma?) {
        idioma = idioma || {};
        this.id = idioma.id || '';
        this.nombre = idioma.nombre || '';
        this.abreviatura = idioma.abreviatura || '';
    }

}
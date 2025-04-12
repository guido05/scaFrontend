export class Mes {
    id: string;
    nombre: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(mes?) {
        mes = mes || {};
        this.id = mes.id || '';
        this.nombre = mes.nombre || '';
    
    }

}
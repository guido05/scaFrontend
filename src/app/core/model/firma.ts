export class Firma {
    id: string;
    dedo1: string;
    dedo2: string;
    dedo3: string;
    dedo4: string;
    firma: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(firma?) {
        firma = firma || {};
        this.id = firma.id || '';
        this.dedo1 = firma.dedo1 || '';
        this.dedo2 = firma.dedo2 || '';
        this.dedo3 = firma.dedo3 || '';
        this.dedo4 = firma.dedo4 || '';
        this.firma = firma.firma || '';
    }

}
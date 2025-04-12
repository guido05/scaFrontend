export class PorcentajeMes {
    id: string;
    porcentaje_aumento: string;
    mes: string;
    ano: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(porcentajeMes?) {
        porcentajeMes = porcentajeMes || {};
        this.id = porcentajeMes.id || '';
        this.porcentaje_aumento = porcentajeMes.porcentaje_aumento || '';
        this.mes = porcentajeMes.mes || '';
        this.ano = porcentajeMes.ano || '';
    }

}
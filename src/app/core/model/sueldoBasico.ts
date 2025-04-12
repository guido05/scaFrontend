export class SueldoBasico {
    id: string;
    sueldo_basico: string;
    categoria: string;
    porcentajeMes: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(sueldoBasico?) {
        sueldoBasico = sueldoBasico || {};
        this.id = sueldoBasico.id || '';
        this.sueldo_basico = sueldoBasico.sueldo_basico || '';
        this.categoria = sueldoBasico.categoria || '';
        this.porcentajeMes = sueldoBasico.porcentajeMes || '';
    }

}
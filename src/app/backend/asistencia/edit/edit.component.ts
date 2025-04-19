import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaService } from 'src/app/core/services/asistencia/asistencia.service';
import { Asistencia } from 'src/app/core/model/asistencia';
import { Condicion } from 'src/app/core/model/condicion';
import { Asociado } from 'src/app/core/model/asociado';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';
import { AsociadoService } from 'src/app/core/services/asociado/asociado.service';


@Component({
  selector: 'app-edit-asistencia',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  asistenciaForm: FormGroup;
  id: number;
  asistencia: Asistencia;

  condiciones: [];
  asociados: [];

  public keywordCondicion = 'descripcion';
  public keywordAsociado = 'documento';
  selectedCondicion: any;
  selectedAsociado: any;


  /**
 * Constructor
 *
 */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asistenciaService: AsistenciaService,
    private condicionService: CondicionService,
    private asociadoService: AsociadoService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getById();
    this.asistenciaForm = this.editAsistenciaForm();
    this.getCondicion();
    this.getAsociado();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create product form
   *
   * @returns {FormGroup}
   */
  editAsistenciaForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.id],
      id_condicion: [''],
      id_asociado: [''],
      horaEntrada: [''],
      horaSalida: [''],
      fecha: [''],
      observacion: ['']
    });
  }

  /**
   * Save product
   */
  saveAsistencia(): void {
    const data = this.asistenciaForm.getRawValue();
    data.id = this.id;
    data.id_condicion = this.selectedCondicion;
    data.id_asociado = this.selectedAsociado;
    this.asistenciaService.update(data)
      .subscribe(result => {
        this.mostrarNotificacionService.showSuccess('Se modificó con éxito', 'Confirmación');
        this.goToList();
      },
        error => {
          if ((error.status === 500) && (error.data != undefined)) {
            this.mostrarNotificacionService.showWarning('No se pudó modificar', 'Error de Servidor');
          } else {
            this.mostrarNotificacionService.showWarning(error.error.data, 'Advertencia');
          }
        });

  }

  getById() {
    this.asistenciaService.getById(this.id)
      .subscribe(data => {
        this.asistencia = new Asistencia(data.data);
        let condicion = new Condicion(this.asistencia.id_condicion);
        let asociado = new Asociado(this.asistencia.id_asociado);
        console.log(asociado.documento);
        this.selectedCondicion = condicion.id;
        this.selectedAsociado = asociado.id;
        this.asistenciaForm = this._formBuilder.group({
          id_condicion: [condicion.descripcion],
          id_asociado: [asociado.documento],
          horaEntrada: [this.asistencia.horaEntrada],
          horaSalida: [this.asistencia.horaSalida],
          fecha: [this.asistencia.fecha[2] + '/' + this.asistencia.fecha[1] + '/' + this.asistencia.fecha[0]],	
          observacion: [this.asistencia.observacion]
        });
      }, error => {
        if (error.status === 500) {
          this.mostrarNotificacionService.showWarning('Error al recuperar los datos', 'Error de servidor');
        } else {
          this.mostrarNotificacionService.showWarning(error.error.data, 'Advertencia');
        }
      });
  }

  goToList() {
    this.router.navigate(['../backend/asistencia/list/']);
  }

  onChangeCondicion(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.getCondicion();
  }

  onFocused(e) {
    // do something when input is focused
  }

  selectEventCondicion(item) {
    this.selectedCondicion= item.id;
  }

  onChangeAsociado(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.getAsociado();
  }

  selectEventAsociado(item) {
    this.selectedAsociado= item.id;
  }

  getCondicion(){
    this.condicionService.getAll().subscribe(response=>{
      this.condiciones = response.data;
    });
   }

   getAsociado(){
    this.asociadoService.getAll().subscribe(response =>{
      this.asociados = response.data;
    })
   }

}


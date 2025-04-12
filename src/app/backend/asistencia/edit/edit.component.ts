import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaService } from 'src/app/core/services/asistencia/asistencia.service';
import { Asistencia } from 'src/app/core/model/asistencia';


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
  /**
 * Constructor
 *
 */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asistenciaService: AsistenciaService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById();
    this.asistenciaForm = this.editAsistenciaForm();
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
      id_asistencia: [''],
      id_dia: [''],
      horaEntrada: [''],
      horaSalida: [''],
      fecha: [''],
      observacion:[''],
      subtotal: ['']
    });
  }

  /**
   * Save product
   */
  saveAsistencia(): void {
    const data = this.asistenciaForm.getRawValue();
    data.id = this.id;
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
        this.asistencia = new Asistencia(data);
        this.asistenciaForm = this._formBuilder.group({
          id_condicion: [this.asistencia.id_condicion],
          id_asistencia: [this.asistencia.id_asistencia],
          id_dia: [this.asistencia.id_dia],
          horaEntrada: [this.asistencia.horaEntrada],
          horaSalida: [this.asistencia.horaSalida],
          fecha: [this.asistencia.fecha],
          observacion: [this.asistencia.observacion],
          subtotal: [this.asistencia.subtotal]
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


}


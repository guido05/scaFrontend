import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaTotalService } from 'src/app/core/services/asistenciaTotal/asistenciaTotal.service';
import { AsistenciaTotal } from 'src/app/core/model/asistenciaTotal';


@Component({
  selector: 'app-edit-asistenci-total',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  asistenciaTotalForm: FormGroup;
  id: number;
  asistenciaTotal: AsistenciaTotal;
  /**
 * Constructor
 *
 */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asistenciaTotalService: AsistenciaTotalService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById();
    this.asistenciaTotalForm = this.editAsistenciaTotalForm();
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
  editAsistenciaTotalForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.id],
      id_mes: [''],
      ano: [''],
      id_asistencia: [''],
      tiempo_hora_anual: [''],
      tiempo_hora_mensual: [''],
      tiempo_hora_primera_quincena: [''],
      tiempo_hora_segunda_quincena: ['']
    });
  }

  /**
   * Save product
   */
  saveAsistenciaTotal(): void {
    const data = this.asistenciaTotalForm.getRawValue();
    data.id = this.id;
    this.asistenciaTotalService.update(data)
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
    this.asistenciaTotalService.getById(this.id)
      .subscribe(data => {
        this.asistenciaTotal = new AsistenciaTotal(data);
        this.asistenciaTotalForm = this._formBuilder.group({
          id_mes: [this.asistenciaTotal.id_mes],
          ano: [this.asistenciaTotal.ano],
          id_asistencia: [this.asistenciaTotal.id_asistencia],
          tiempo_hora_anual: [this.asistenciaTotal.tiempo_hora_anual],
          tiempo_hora_mensual: [this.asistenciaTotal.tiempo_hora_mensual],
          tiempo_hora_primera_quincena:[this.asistenciaTotal.tiempo_hora_primera_quincena],
          tiempo_hora_segunda_quincena: [this.asistenciaTotal.tiempo_hora_segunda_quincena]
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
    this.router.navigate(['../backend/asistenciaTotal/list/']);
  }


}


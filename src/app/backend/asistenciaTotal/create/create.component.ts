import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaTotalService } from 'src/app/core/services/asistenciaTotal/asistenciaTotal.service';

@Component({
  selector: 'app-create-asistencia-total',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCanalComponent implements OnInit, OnDestroy {
  asistenciaTotalForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asistenciaTotalService: AsistenciaTotalService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.asistenciaTotalForm = this.createAsistenciaTotalForm();
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
  createAsistenciaTotalForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
      id_mes: [''],
      ano: [''],
      id_asistencia: [''],
      tiempo_hora_anual: [''],
      tiempo_hora_mensual: [''],
      tiempo_hora_primera_quincena: [''],
      tiempo_hora_segunda_quincena: ['']
    });
  }

  addAsistenciaTotal() {
    const data = this.asistenciaTotalForm.getRawValue();
    this.asistenciaTotalService.create(data).subscribe(
      response => {
        this.mostrarNotificacionService.showSuccess('Se agregó con éxito', 'Confirmación');
        this.goToList();
      },
      error => {
        if (error.status === 500) {
          this.mostrarNotificacionService.showWarning('Error al agregar', 'Error de servidor');
        } else {
          this.mostrarNotificacionService.showWarning(error.error.data, 'Advertencia');
        }

      });
  }

  goToList() {
    this.router.navigate(['../backend/asistenciaTotal/list/']);
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaService } from 'src/app/core/services/asistencia/asistencia.service';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';

@Component({
  selector: 'app-create-asistencia',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCanalComponent implements OnInit, OnDestroy {
  asistenciaForm: FormGroup;
  condiciones: [];

  public keyword = 'descripcion';
  selectedCondicion: any;



  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asistenciaService: AsistenciaService,
    private condicionService: CondicionService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.asistenciaForm = this.createAsistenciaForm();
    this.getCondicion();
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
  createAsistenciaForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
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

  addAsistencia() {
    const data = this.asistenciaForm.getRawValue();
    data.id_condicion = this.selectedCondicion;
    this.asistenciaService.create(data).subscribe(
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

  getCondicion(){
    this.condicionService.getAll().subscribe(response=>{
      this.condiciones = response.data;
    });
   }
}

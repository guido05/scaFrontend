import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { MesService } from 'src/app/core/services/mes/mes.service';
import { Mes } from 'src/app/core/model/mes';

@Component({
  selector: 'app-create-mes',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  mesForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private mesService: MesService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.mesForm = this.createMesForm();
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
  createMesForm(): FormGroup {
    return this._formBuilder.group({
      nombre: ['', Validators.required]
    });
  }


  addMes() {
    const data = this.mesForm.getRawValue();
  
    this.mesService.create(data).subscribe(result => {
        this.mostrarNotificacionService.showSuccess('Se agregó con éxito', 'Confirmación');
        this.goToList()      
      },
      error => {
        if (error.status === 500) {
          this.mostrarNotificacionService.showError('Error al agregar', 'Error de servidor');
        } else {
          this.mostrarNotificacionService.showWarning(error.error.data, 'Advertencia');
        }

      });
  }

  goToList() {
    this.router.navigate(['../backend/mes/list/']);
  }
}

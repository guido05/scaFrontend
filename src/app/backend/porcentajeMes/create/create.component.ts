import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { PorcentajeMesService } from 'src/app/core/services/porcentajeMes/porcentajeMes.service';

@Component({
  selector: 'app-create-sueldo-basico',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  porcentajeMesForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private porcentajeMesService: PorcentajeMesService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.porcentajeMesForm = this.createPorcentajeMesForm();
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
  createPorcentajeMesForm(): FormGroup {
    return this._formBuilder.group({
      porcentaje_aumento:[''],
      mes:[''],
      ano:[''],
    });
  }


  addPorcentajeMes() {
    const data = this.porcentajeMesForm.getRawValue();
  
    this.porcentajeMesService.create(data).subscribe(result => {
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
    this.router.navigate(['../backend/porcentajeMes/list/']);
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { FirmaService } from 'src/app/core/services/firma/firma.service';

@Component({
  selector: 'app-create-firma',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCanalComponent implements OnInit, OnDestroy {
  firmaForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private firmaService: FirmaService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.firmaForm = this.createFirmaForm();
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
  createFirmaForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
      firma: [''],
      dedo1: [''],
      dedo2: [''],
      dede3: [''],
      dedo4: [''],
    });
  }

  addFirma() {
    const data = this.firmaForm.getRawValue();
    this.firmaService.create(data).subscribe(
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
    this.router.navigate(['../backend/firma/list/']);
  }
}

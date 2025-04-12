import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsociadoService } from 'src/app/core/services/asociado/asociado.service';
import { Asociado } from 'src/app/core/model/asociado';


@Component({
  selector: 'app-edit-asociado',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  asociadoForm: FormGroup;
  id: number;
  asociado: Asociado;
  /**
 * Constructor
 *
 */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asociadoService: AsociadoService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById();
    this.asociadoForm = this.editAsociadoForm();
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
  editAsociadoForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.id],
      nombre: [this.asociado.nombre],
      apellido: [this.asociado.apellido],
      legajo: [this.asociado.legajo],
      categorias: [this.asociado.categorias],
      telefono: [this.asociado.telefono],
      documento: [this.asociado.documento]
    });
  }

  /**
   * Save product
   */
  saveAsociado(): void {
    const data = this.asociadoForm.getRawValue();
    data.id = this.id;
    this.asociadoService.update(data)
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
    this.asociadoService.getById(this.id)
      .subscribe(data => {
        this.asociado = new Asociado(data);
        this.asociadoForm = this._formBuilder.group({
          nombre: [this.asociado.nombre],
          apellido: [this.asociado.apellido],
          legajo: [this.asociado.legajo],
          categorias: [this.asociado.categorias],
          telefono: [this.asociado.telefono],
          documento: [this.asociado.documento]
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
    this.router.navigate(['../backend/asociado/list/']);
  }


}


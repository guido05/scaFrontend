import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';
import { Condicion } from 'src/app/core/model/condicion';


@Component({
  selector: 'app-edit-condicion',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  condicionForm: FormGroup;
  id: number;
  condicion: Condicion;

  /**
   * Constructor
   *
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private condicionService: CondicionService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.condicionForm = this.editCondicionForm();
    this.getById();
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
  editCondicionForm(): FormGroup {
    return this._formBuilder.group({
      id:[this.id],
      sigla:[''],
      descripcion:['']
    });
  }

  /**
   * Save product
   */
  saveCondicion(): void {
    const data = this.condicionForm.getRawValue();
    data.id = this.id;
    this.condicionService.update(data)
      .subscribe(result => {
          this.mostrarNotificacionService.showSuccess('Se modificó con éxito', 'Confirmación');
          this.goToList();
        },
        error => {
          if ((error.status === 500) && (error.data != undefined)) {
            this.mostrarNotificacionService.showWarning('No se pudó modificar', 'Error de Servidor');
          } else {
            this.mostrarNotificacionService.showWarning(error.error.data, 'Advertencia');
          }
        });

  }

  getById() {
    this.condicionService.getById(this.id)
      .subscribe(data => {
        this.condicion = new Condicion(data.data);
        this.condicionForm = this._formBuilder.group({
          sigla: [this.condicion.sigla],
          descripcion: [this.condicion.descripcion]
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
    this.router.navigate(['/backend/condicion/list/']);
  }


}


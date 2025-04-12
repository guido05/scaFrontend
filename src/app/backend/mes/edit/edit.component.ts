import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { MesService } from 'src/app/core/services/mes/mes.service';
import { Mes } from 'src/app/core/model/mes';


@Component({
  selector: 'app-edit-mes',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  mesForm: FormGroup;
  id: number;
  mes: Mes;

  /**
   * Constructor
   *
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private mesService: MesService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mesForm = this.editMesForm();
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
  editMesForm(): FormGroup {
    return this._formBuilder.group({
      id:[this.id],
      nombre:['']
    });
  }

  /**
   * Save product
   */
  saveMes(): void {
    const data = this.mesForm.getRawValue();
    data.id = this.id;
    this.mesService.update(data)
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
    this.mesService.getById(this.id)
      .subscribe(data => {
        this.mes = new Mes(data.data);
        this.mesForm = this._formBuilder.group({
          nombre: [this.mes.nombre],
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
    this.router.navigate(['/backend/mes/list/']);
  }


}


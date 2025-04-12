import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { SueldoBasico } from 'src/app/core/model/sueldoBasico';
import { SueldoBasicoService } from 'src/app/core/services/sueldoBasico/sueldoBasico.service';



@Component({
  selector: 'app-edit-sueldo-basico',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  sueldoBasicoForm: FormGroup;
  id: number;
  sueldoBasico: SueldoBasico;

  /**
   * Constructor
   *
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private sueldoBasicoService: SueldoBasicoService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sueldoBasicoForm = this.editSueldoBasicoForm();
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
  editSueldoBasicoForm(): FormGroup {
    return this._formBuilder.group({
      id:[this.id],
      sueldo_basico:[''],
      categoria:[''],
      porcentajeMes:[''],
    });
  }

  /**
   * Save product
   */
  saveSueldoBasico(): void {
    const data = this.sueldoBasicoForm.getRawValue();
    data.id = this.id;
    this.sueldoBasicoService.update(data)
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
    this.sueldoBasicoService.getById(this.id)
      .subscribe(data => {
        this.sueldoBasico = new SueldoBasico(data.data);
        this.sueldoBasicoForm = this._formBuilder.group({
          sueldo_basico:[this.sueldoBasico.sueldo_basico],
          categoria:[this.sueldoBasico.categoria],
          porcentajeMes:[this.sueldoBasico.porcentajeMes],
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
    this.router.navigate(['/backend/sueldoBasico/list/']);
  }


}


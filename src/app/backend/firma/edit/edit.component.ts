import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { FirmaService } from 'src/app/core/services/firma/firma.service';
import { Firma } from 'src/app/core/model/firma';


@Component({
  selector: 'app-edit-firma',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  firmaForm: FormGroup;
  id: number;
  firma: Firma;
  /**
 * Constructor
 *
 */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private firmaService: FirmaService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getById();
    this.firmaForm = this.editFirmaForm();
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
  editFirmaForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.id],
      firma: [''],
      dedo1: [''],
      dedo2: [''],
      dede3: [''],
      dedo4: [''],
    });
  }

  /**
   * Save product
   */
  saveFirma(): void {
    const data = this.firmaForm.getRawValue();
    data.id = this.id;
    this.firmaService.update(data)
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
    this.firmaService.getById(this.id)
      .subscribe(data => {
        this.firma = new Firma(data);
        this.firmaForm = this._formBuilder.group({
          firma: [this.firma.firma],
          dedo1: [this.firma.dedo1],
          dedo2: [this.firma.dedo2],
          dedo3: [this.firma.dedo3],
          dedo4: [this.firma.dedo4],
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
    this.router.navigate(['../backend/firma/list/']);
  }


}


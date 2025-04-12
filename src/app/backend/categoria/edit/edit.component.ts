import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { Categoria } from 'src/app/core/model/categoria';


@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  categoriaForm: FormGroup;
  id: number;
  categoria: Categoria;

  /**
   * Constructor
   *
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private categoriaService: CategoriaService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoriaForm = this.editCategoriaForm();
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
  editCategoriaForm(): FormGroup {
    return this._formBuilder.group({
      id:[this.id],
      nombre:['']
    });
  }

  /**
   * Save product
   */
  saveCategoria(): void {
    const data = this.categoriaForm.getRawValue();
    data.id = this.id;
    this.categoriaService.update(data)
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
    this.categoriaService.getById(this.id)
      .subscribe(data => {
        this.categoria = new Categoria(data.data);
        this.categoriaForm = this._formBuilder.group({
          nombre: [this.categoria.nombre],
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
    this.router.navigate(['/backend/categoria/list/']);
  }


}


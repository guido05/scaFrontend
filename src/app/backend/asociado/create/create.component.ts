import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsociadoService } from 'src/app/core/services/asociado/asociado.service';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';

@Component({
  selector: 'app-create-asociado',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateCanalComponent implements OnInit, OnDestroy {
  asociadoForm: FormGroup;

  public keyword = '';
  selectedCategoria: any;
  categorias: [];

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asociadoService: AsociadoService,
    private categoriaService:CategoriaService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.asociadoForm = this.createAsociadoForm();
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
  createAsociadoForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
      nombre: [''],
      apellido: [''],
      legajo: [''],
      categorias: [''],
      telefono: [''],
      documento: ['']
    });
  }

  addAsociado() {
    const data = this.asociadoForm.getRawValue();
    data.categoria = this.selectedCategoria;
    this.asociadoService.create(data).subscribe(
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
    this.router.navigate(['../backend/asociado/list/']);
  }

  onFocused(e) {
      // do something when input is focused
    }

  onChangeCategoria(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.keyword = "nombre";
    this.getCategoria();
  }

  selectEventCategoria(item) {
    
    this.selectedCategoria= item.id;
  }

  getCategoria(){
    this.categoriaService.getAll().subscribe(response=>{
      this.categorias = response.data;
    });
   }

}

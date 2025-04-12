import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsociadoCondicionService } from 'src/app/core/services/asociadoCondicion/asociadoCondicion.service';
import { AsociadoCondicion } from 'src/app/core/model/asociadoCondicion';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';
import { AsociadoService } from 'src/app/core/services/asociado/asociado.service';

@Component({
  selector: 'app-create-AsociadoCondicion',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  asociadoCondicionForm: FormGroup;

  public keyword = '';
  selectedCondicion: any;
  condiciones: [];

  selectedAsociado: any;
  asociados: [];

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    public route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asociadoCondicionService: AsociadoCondicionService,
    private condicionService: CondicionService,
    private asociadoService: AsociadoService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.asociadoCondicionForm = this.createAsociadoCondicionForm();
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
  createAsociadoCondicionForm(): FormGroup {
    return this._formBuilder.group({
      asociado:[''],
      condicion:['']
    });
  }


  addAsociadoCondicion() {
    const data = this.asociadoCondicionForm.getRawValue();
    data.condicion = this.selectedCondicion;
    data.asociado = this.selectedAsociado;
    this.asociadoCondicionService.create(data).subscribe(result => {
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
    this.router.navigate(['../backend/asociadoCondicion/list/']);
  }

  onChangeCondicion(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.keyword = "descripcion";
    this.getCondicion();
  }

  onFocused(e) {
    // do something when input is focused
  }

  selectEventCondicion(item) {
    
    this.selectedCondicion= item.id;
  }

  getCondicion(){
    this.condicionService.getAll().subscribe(response=>{
      this.condiciones = response.data;
    });
   }

  selectEventAsociado(item) {
    this.selectedAsociado= item.id;
  }

  getAsociado(){
    this.asociadoService.getAll().subscribe(response=>{
      this.asociados = response.data;
    });
   }

   onChangeAsociado(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.keyword = "nombre";
    this.getAsociado();
  }
}

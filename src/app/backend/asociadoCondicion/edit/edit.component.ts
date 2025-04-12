import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MostrarNotificacionService} from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsociadoCondicionService } from 'src/app/core/services/asociadoCondicion/asociadoCondicion.service';
import { AsociadoCondicion } from 'src/app/core/model/asociadoCondicion';
import { AsociadoService } from 'src/app/core/services/asociado/asociado.service';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';


@Component({
  selector: 'app-edit-condicion',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditComponent implements OnInit, OnDestroy {
  pageType: string;
  asociadoCondicionForm: FormGroup;
  id: number;
  asociadoCondicion: AsociadoCondicion;

  public keyword = '';
  
  selectedAsociado: any;
  asociados: [];
  nombre: any;

  selectedCondicion: any;
  condiciones: [];
  descripcion: any;

  /**
   * Constructor
   *
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public mostrarNotificacionService: MostrarNotificacionService,
    private asociadoCondicionService: AsociadoCondicionService,
    private asociadoService:AsociadoService,
    private condicionService:CondicionService
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.asociadoCondicionForm = this.editAsociadoCondicionForm();
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
  editAsociadoCondicionForm(): FormGroup {
    return this._formBuilder.group({
      id:[this.id],
      asociado:[''],
      condicion:['']
    });
  }

  /**
   * Save product
   */
  saveAsociadoCondicion(): void {
    const data = this.asociadoCondicionForm.getRawValue();
    data.id = this.id;
    data.asociado = this.selectedAsociado;
    data.condicion = this.selectedCondicion;
    this.asociadoCondicionService.update(data)
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
    this.asociadoCondicionService.getById(this.id)
      .subscribe(data => {
        this.asociadoCondicion = new AsociadoCondicion(data.data);
        this.nombre = data.data.asociado.nombre;
        this.descripcion = data.data.condicion.descripcion;
        this.selectEventAsociado(data.data.asociado.id)
        this.asociadoCondicionForm = this._formBuilder.group({
          asociado: [this.asociadoCondicion.asociado],
          condicion: [this.asociadoCondicion.condicion]
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
    this.router.navigate(['/backend/asociadoCondicion/list/']);
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

  onChangeCondicion(val: string) {
    this.keyword = "descripcion";
    this.getCondicion();
  }

}


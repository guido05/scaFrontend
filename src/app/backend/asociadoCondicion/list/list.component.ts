import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsociadoCondicionService } from 'src/app/core/services/asociadoCondicion/asociadoCondicion.service';


@Component({
    selector: 'app-list-asociadoCondicion',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 asociadoCondiciones: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 
 table:any;


 constructor( private asociadoCondicionService: AsociadoCondicionService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.asociadoCondiciones = [];
     this.getAsociadoCondicion();
 }

 getAsociadoCondicion(){
  this.asociadoCondicionService.getAll().subscribe(response=>{
    this.asociadoCondiciones = response.data;
    if (this.isDtInitialized) {
      $('#tabla').DataTable().destroy();
    } else {
      this.dtTrigger.next(); // Inicializar solo la primera vez
      this.isDtInitialized = true;
    }
  });
 }

  /**
   *
   * Delete AsociadoCondicion
   */

  deleteAsociadoCondicion(id:number){
    this.asociadoCondicionService.delete(id)
    .subscribe(
      data =>{
        this.getAsociadoCondicion();
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el AsociadoCondicion','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

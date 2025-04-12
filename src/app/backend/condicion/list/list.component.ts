import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { CondicionService } from 'src/app/core/services/condicion/condicion.service';


@Component({
    selector: 'app-list-condicion',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 condiciones: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 
 table:any;


 constructor( private condicionService: CondicionService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.condiciones = [];
     this.getCondicion();
 }

 getCondicion(){
  this.condicionService.getAll().subscribe(response=>{
    this.condiciones = response.data;
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
   * Delete Condicion
   */

  deleteCondicion(id:number){
    this.condicionService.delete(id)
    .subscribe(
      data =>{
        this.getCondicion();
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el condicion','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

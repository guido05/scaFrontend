import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaTotalService } from 'src/app/core/services/asistenciaTotal/asistenciaTotal.service';


@Component({
    selector: 'app-list-asistencia-total',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 asistenciasTotales: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 


 constructor( private asistenciaTotalService: AsistenciaTotalService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.asistenciasTotales = [];
     this.getAsistenciaTotal();
 }

 getAsistenciaTotal(){
  this.asistenciaTotalService.getAll().subscribe(response=>{
    this.asistenciasTotales = response;
    if (this.isDtInitialized) {
      $('#tabla').DataTable().destroy();
    } else {
      this.dtTrigger.next(); // Inicializar solo la primera vez
      this.isDtInitialized = true;
    }
  });
  };
 

  /**
   *
   * Delete Product
   */

  deleteAsistenciaTotal(id:number){
    this.asistenciaTotalService.delete(id)
    .subscribe(
      data =>{
        this.getAsistenciaTotal()
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el asistencia total','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

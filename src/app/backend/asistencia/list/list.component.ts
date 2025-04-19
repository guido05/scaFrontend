import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { AsistenciaService } from 'src/app/core/services/asistencia/asistencia.service';


@Component({
    selector: 'app-list-asistencia',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 asistencias: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 


 constructor( private asistenciaService: AsistenciaService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.asistencias = [];
     this.findAsistenciaWithUserAndRegAndAsociado();
 }

 getAsistencia(){
  this.asistenciaService.getAll().subscribe(response=>{
    this.asistencias = response;
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

  deleteAsistencia(id:number){
    this.asistenciaService.delete(id)
    .subscribe(
      data =>{
        this.getAsistencia()
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el asistencia','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }

  findAsistenciaWithUserAndRegAndAsociado(){
    this.asistenciaService.findByUserAndRegAndAsociado().subscribe(response=>{
      this.asistencias = response.data;
      console.log(this.asistencias);
      if (this.isDtInitialized) {
        $('#tabla').DataTable().destroy();
      } else {
        this.dtTrigger.next(); // Inicializar solo la primera vez
        this.isDtInitialized = true;
      }
      console.log(this.asistencias);
    });
  }
  
}

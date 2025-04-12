import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { MesService } from 'src/app/core/services/mes/mes.service';


@Component({
    selector: 'app-list-mes',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 meses: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 
 table:any;


 constructor( private mesService: MesService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.meses = [];
     this.getMes();
 }

 getMes(){
  this.mesService.getAll().subscribe(response=>{
    this.meses = response.data;
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
   * Delete Mes
   */

  deleteMes(id:number){
    this.mesService.delete(id)
    .subscribe(
      data =>{
        this.getMes();
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el mes','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

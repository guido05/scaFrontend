import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { DiaService } from 'src/app/core/services/dia/dia.service';


@Component({
    selector: 'app-list-dia',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

 dias: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 
 table:any;


 constructor( private diaService: DiaService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.dias = [];
     this.getDia();
 }

 getDia(){
  this.diaService.getAll().subscribe(response=>{
    this.dias = response.data;
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
   * Delete Dia
   */

  deleteDia(id:number){
    this.diaService.delete(id)
    .subscribe(
      data =>{
        this.getDia();
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el dia','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

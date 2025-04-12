import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { MostrarNotificacionService } from 'src/app/core/services/mostrarNotificacion/mostrar-notificacion.service';
import { PorcentajeMesService } from 'src/app/core/services/porcentajeMes/porcentajeMes.service';


@Component({
    selector: 'app-list-porcentaje-mes',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
export class ListComponent implements OnInit
{

  porcentajeMes: any;
 @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized: boolean = false; 
 table:any;


 constructor( private porcentajeMesService: PorcentajeMesService, private router: Router,
              public route: ActivatedRoute, public mostrarNotificacionService: MostrarNotificacionService ) {
 }

 ngOnInit() {
     this.porcentajeMes = [];
     this.getPorcentajeMes();
 }

 getPorcentajeMes(){
  this.porcentajeMesService.getAll().subscribe(response=>{
    this.porcentajeMes = response.data;
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

  deletePorcentajeMes(id:number){
    this.porcentajeMesService.delete(id)
    .subscribe(
      data =>{
        this.getPorcentajeMes();
      },
      error => {
        if(error.status === 500){
          this.mostrarNotificacionService.showWarning('No se pudo borrar el PorcentajeMes','Error de Servidor');
        }else{
          this.mostrarNotificacionService.showWarning(error,'');
        }
      });
  }
}

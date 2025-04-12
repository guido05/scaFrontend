import { Injectable } from "@angular/core";
import { AppComponent } from "../../../../app.component";

export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItemsCentral = [
  {
    id: "applications",
    title: "Menu",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "asociado",
        title: "asociado",
        type: "item",
        icon: "icon-user",
        url: "./asociado/list",
      },
      /*{
        id: "porcentajeMes",
        title: "porcentajeMes",
        type: "item",
        icon: "icon-calendar",
        url: "./porcentajeMes/list",
      },*/
      /*{
        id: "sueldoBasico",
        title: "sueldoBasico",
        type: "item",
        icon: "icon-cloud",
        url: "./sueldoBasico/list",
      },*/
      /*{
        id: "configuracion",
        title: "configuracion",
        type: "collapse",
        icon: "icon-cloud",
        children: [
          {
            id: "dia",
            title: "dia",
            type: "item",
            icon: "icon-calendar",
            url: "./dia/list",
          },
          {
            id: "mes",
            title: "mes",
            type: "item",
            icon: "icon-calendar",
            url: "./mes/list",
          },
        ],
      },*/
      {
        id: "asistencia",
        title: "Asistencia",
        type: "item",
        icon: "icon-calendar",
        url: "./asistencia/list",
      },
      /*{
        id: "asistenciaTotal",
        title: "AsistenciaTotal",
        type: "item",
        icon: "icon-calendar",
        url: "./asistenciaTotal/list",
      },*/
      /*{
        id: "asociadoCondicion",
        title: "AsociadoCondicion",
        type: "item",
        icon: "icon-calendar",
        url: "./asociadoCondicion/list",
      },*/
      {
        id: "categoriaCondicion",
        title: "Configuración",
        type: "collapse",
        icon: "icon-calendar",
        children: [
          {
            id: "categoria",
            title: "Categoria",
            type: "item",
            icon: "icon-calendar",
            url: "./categoria/list",
          },
          {
            id: "condicion",
            title: "Condicion",
            type: "item",
            icon: "icon-calendar",
            url: "./condicion/list",
          },
        ],
      },
      /*{
        id: "firma",
        title: "Firma",
        type: "item",
        icon: "icon-calendar",
        url: "./firma/list",
      },*/
    ],
  },
];

@Injectable()
export class NavigationItem {
  constructor() {}

  public getCentral() {
    return NavigationItemsCentral;
  }
}

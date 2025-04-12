import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IdiomaService } from 'src/app/core/services/idioma/idioma.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  public searchOn: boolean;
  isLoading: boolean;

  constructor(public translate: TranslateService, public idiomaService: IdiomaService) {
    this.isLoading = true;
    this.searchOn = false;
  }

  ngOnInit() { }




}

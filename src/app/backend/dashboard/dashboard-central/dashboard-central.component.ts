import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { ChartDB } from '../../../fack-db/chart-data';
import { ApexChartService } from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';

@Component({
  selector: 'app-dashboard-central',
  templateUrl: './dashboard-central.component.html',
  styleUrls: ['./dashboard-central.component.scss']
})

export class DashboardCentralComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {

    }


}

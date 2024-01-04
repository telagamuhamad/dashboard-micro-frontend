import { Component } from '@angular/core';
import { ChartType, ApexOptions } from 'ng-apexcharts';
import * as ApexCharts from 'apexcharts';

interface Chart {
  name: string;
  identifier: string;
  type: ChartType;
  data: number[];
  categories?: string[];
}
@Component({
  selector: 'app-dashboard-content',
  templateUrl: 
  `
    <div>
      <h2>Dashboard</h2>
      <div *ngFor="let chart of charts">
        <h3>{{ chart.name }}</h3>
        <ng-apexcharts
          *ngIf="chart.type === 'area' || chart.type === 'line' || chart.type === 'bar'"
          [series]="[{ data: chart.data }]"
          [chart]="{ type: chart.type }"
          [xaxis]="{ categories: chart.categories }"
          [options]="chartOptions"
        ></ng-apexcharts>
      </div>
    </div>
  `,
  styleUrls: [
    `
    div {
      padding: 20px;
    }

    h3 {
      margin-bottom: 10px;
    }
  `
  ]
})
export class DashboardContentComponent {
  public charts: Chart[] = [];

  ngOnInit() {
    this.charts = [
      {
        name: 'Area Chart',
        identifier: 'areaChart',
        type: 'area',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Line Chart',
        identifier: 'lineChart',
        type: 'line',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Column Chart',
        identifier: 'columnChart',
        type: 'bar',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Bar Chart',
        identifier: 'barChart',
        type: 'bar',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    ];
  }

  initializeChart(chart: Chart): void {
    const options: ApexOptions = {
      series: chart.type === 'pie' || chart.type === 'donut' ? chart.data : [{ data: chart.data }],
      chart: { type: chart.type, height: 350 },
      labels: chart.categories,
    };
    

    new ApexCharts(document.querySelector(`#${chart.identifier}`), options).render();
  }

  ngAfterViewInit(): void {
    this.charts.forEach(chart => {
      this.initializeChart(chart);
    });
  }
}

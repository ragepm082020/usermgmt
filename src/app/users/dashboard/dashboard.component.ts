import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataFromChild:string;
  public pieChartOptions: ChartOptions = {   responsive: true,  };
  public pieChartLabels: Label[] = ['Admin', 'HR', 'IT'];
  public pieChartData: SingleDataSet = [3, 5, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  
  handlerOnParent(event)  {    this.dataFromChild = event;    /*Do any other prorcesing here */ 
    var cntValue = this.dataFromChild;
    let usersStats = cntValue.split("#####");
     this.pieChartOptions = {   responsive: true,  };
     this.pieChartLabels = ['Admin', 'HR', 'IT'];
     this.pieChartData = [Number(usersStats[0]), Number(usersStats[1]), Number(usersStats[2])];

  }
}

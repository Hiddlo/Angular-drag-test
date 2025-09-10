import { Component, inject, input } from '@angular/core';
import { AgGridAngular} from 'ag-grid-angular';
import { IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import { ColDef, GridOptions, GridApi, FirstDataRenderedEvent, ModuleRegistry } from 'ag-grid-community';
import { HousingService } from '../housing.service';
import {HousingLocationInfo} from '../housing-location';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

ModuleRegistry.registerModules([ IntegratedChartsModule.with(AgChartsEnterpriseModule) ]); 

@Component({
  selector: 'app-table',
  imports: [AgGridAngular, CdkDrag, CdkDragHandle],
  template: `
   <!-- The AG Grid component -->
   <section style="background: var(--accent-color);
    border-radius: 30px;
    padding-top: 20px;
    width: 700px;
    height:600px;
    resize: both;
    overflow: scroll;"
    cdkDrag>
    <button cdkDragHandle> Drag </button>
    <ag-grid-angular
        [rowData]="rowData"
        [columnDefs]="colDefs"
        [enableCharts]="true"
        (firstDataRendered)="onFirstDataRendered($event)"
        style="width: 100%; height: 45%; resize: both" />
    <div [attr.id]=myChart+tableid() style="flex: 1 1 auto; height: 45%; resize: both"></div>
    </section>
  `
})
export class Table {

  tableid = input.required<number>();
  myChart = "myChart"; 
  private gridApi!: GridApi;
  housingLocationList: HousingLocationInfo[] = [];
  housingService : HousingService = inject(HousingService);
  rowData = this.housingService.getAllHousingLocations();

  colDefs : ColDef[] = [
    {field: "name", chartDataType: "category"},
    {field: "city"},
    {field: "state"},
    {field: "availableUnits", chartDataType:"series"}
  ]

   onFirstDataRendered(event: FirstDataRenderedEvent) {
    this.createChart(event);
  }

  gridOptions: GridOptions = {
      columnDefs: this.colDefs,
      enableCharts: true,
  }

  createChart(params: FirstDataRenderedEvent){
    console.log('creating chart');
    console.log('looking for element #myChart'+this.tableid())
    params.api.createRangeChart({
      chartContainer: document.querySelector("#"+this.myChart+this.tableid()) as HTMLElement,
      cellRange: {
        columns: ["name", "availableUnits"],
      },
      chartType: "groupedColumn",
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: "Available Units",
          },
        },
      },
    });
  }
}

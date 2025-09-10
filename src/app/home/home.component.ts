import {Component, inject} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location.component';
import { Table } from '../table/table';
import {HousingLocationInfo} from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, Table],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
      <button class="primary" type="button" (click)="addTable()">Add table</button>
      
      <button class="primary" type="button" (click)="removeTable()">Remove table</button>
    </section>
    <!--<section class="results">
      @for(housingLocation of housingLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>-->
    <section class="results">
      @for(item of tablelist; track item; let index = $index) {
        <app-table [tableid]=index></app-table>
      }

    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  tablelist: number[] = [];
  tableNo = 0
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  addTable(){
    this.tablelist.push(this.tableNo)
    this.tableNo += 1;
    console.log(this.tablelist);

  }
  removeTable(){
    this.tablelist.pop()
    this.tableNo -= 1;

  }
}
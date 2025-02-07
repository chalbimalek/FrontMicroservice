import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-micro-tow',
  templateUrl: './micro-tow.component.html',
  styleUrls: ['./micro-tow.component.css']
})
export class MicroTowComponent implements OnInit{
  data:any;
  constructor(private apiService:ApiService) { }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const data = this.apiService.getDataFromServiceB().subscribe(
      (response: string) => {
        this.data = response;
        console.log('Data received:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}

import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-micro-one',
  templateUrl: './micro-one.component.html',
  styleUrls: ['./micro-one.component.css']
})
export class MicroOneComponent implements OnInit{
  data:any;
    constructor(private apiService:ApiService) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const data = this.apiService.getDataFromServiceA().subscribe(
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

import { Component, OnInit } from '@angular/core';
import { Annonce } from '../model/Annonce';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from 'src/app/service/annonce.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit{


annonce!:Annonce

constructor(private activatedRoute:ActivatedRoute,private userService: UserService,private annonceservice:AnnonceService){}
selectAnnonceIndex = 0;
username: string = '';

ngOnInit(): void {
    this.annonce = this.activatedRoute.snapshot.data['annonce']; // Doit correspondre au nom utilisé dans la route
    this.getusername(this.annonce.userId); // Remplacez '123' par l'ID de l'utilisateur actuel

  }

  changeIndex(index:any){
    this.selectAnnonceIndex=index;
  }

  getusername(userId:string){
    this.userService.getUsername(userId).subscribe(
      (response) => {
        this.username = response;
        console.log(this.username, "username");

      },
      (error) => {
        console.error('Error fetching username:', error);
      }
    );
  }
}

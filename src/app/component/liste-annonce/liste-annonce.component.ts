import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Annonce, TypeLogement } from '../model/Annonce';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.css']
})
export class ListeAnnonceComponent implements OnInit {
 constructor(private Annonceservice: AnnonceService,private router : Router,private sanitizer:DomSanitizer,private imageProcessingService:ImageProcessingService) {

  const customWindow: CustomWindow = window;

  customWindow.embeddedChatbotConfig = {
    chatbotId: 'c4_fFbFsL-cYs9-NvhrVk',
    domain: 'www.chatbase.co',
  };

  const script = document.createElement('script');
  script.src = 'https://www.chatbase.co/embed.min.js';
  script.setAttribute('chatbotId', 'c4_fFbFsL-cYs9-NvhrVk');
  script.setAttribute('domain', 'www.chatbase.co');
  script.defer = true;

  script.onload = () => {
    console.log('Chatbase script loaded successfully!');
    // Perform additional actions if needed
  };

  script.onerror = (error) => {
    console.error('Error loading Chatbase script:', error);
  };

  document.head.appendChild(script);
}

 Data !:Annonce[]

 ngOnInit(): void {
  this.getAllProduct()

 }
  listeAnnonce() {
    this.Annonceservice.getAllAppartements().subscribe(
     (response:Annonce[]) => {
        this.Data=response;
        console.log('Annonce recuperée avec succès', response);
        console.log("image ",this.annonce.imageModels[0].url); // Vérifier l'URL dans la console

      },
      error => {
        console.error('Erreur lors de la recuperation de la réservation', error);
      }
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  p:number=1;
  searchTerm: string='' ;
  public Annonces: Annonce[] = [];



  public getAllProduct(){
    this.Annonceservice.getAllAppartements()
    .pipe(
    map((x: Annonce[], i) => x.map((product: Annonce) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Annonce[])=>{
      console.log(resp);

      this.Annonces=resp;
    },(error:HttpErrorResponse )=>{
      console.log(error);
    }
    );
  }
  get filteredProducts() {
    return this.Annonces.filter(product => {
      // Filtrer les produits en fonction du terme de recherche
      return product.addresse.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  formData: FormData = new FormData();


  annonce!:Annonce ;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
    }
  }
  /////////////////////////
  pageNumber: number = 0;
  showLoadButton = false;









  goToannonce(id:any){
    this.router.navigate(['/detailAnnonce', id]); // Correction de la syntaxe
  }



  currentDate: Date = new Date();
// | paginate :{itemsPerPage:5,currentPage:p};


///////////////
categories: { name: TypeLogement; iconClass: string; }[] = [
  { name: TypeLogement.APPARTEMENT, iconClass: 'lni lni-dinner' },
  { name: TypeLogement.MAISON, iconClass: 'lni lni-control-panel' },
  { name: TypeLogement.STUDIO, iconClass: 'lni lni-bullhorn' }
  // Ajoutez d'autres catégories si nécessaire
];


/*loadProductsByCategory(category: TypeLogement): void {
  this.selectedCategory = category;
  this.productservice.getProductsByCategory(category)
    .subscribe(products => {
      this.productDetails = products.map(product => this.imageProcessingService.createImages(product));
    });
}*/

selectedCategory!: TypeLogement  | string;

isSelected(category: any): boolean {
  if (typeof this.selectedCategory === 'string' && this.selectedCategory === 'all') {
    return category === 'all'; // Si selectedCategory est 'all', retourne true seulement si category est 'all'
  } else {
    return this.selectedCategory === category.name; // Compare avec category.name seulement si selectedCategory est de type Category
  }
}
showAllProducts(){
  this.selectedCategory='all';
  this.getAllProduct()
}
}



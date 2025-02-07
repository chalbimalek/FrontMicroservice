import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Annonce, TypeLogement } from '../component/model/Annonce';
import { ImageProcessingService } from './image-processing.service';
import { AnnonceService } from './annonce.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceResolveService implements Resolve<Annonce>{

  constructor(private image: ImageProcessingService, private AnnonceService: AnnonceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Annonce> {
    const id = route.paramMap.get("id");
    if (id) {
      const AnnonceId = parseInt(id, 10);
      return this.AnnonceService.getAppartementByid(AnnonceId).pipe(
       map(p => (this.image.createImages(p))),
        catchError(error => {
          console.error("Error fetching Annonce details:", error);
          return of(this.getAnnonceDetails()); // Retourner un produit vide en cas d'erreur
        })
      );
    } else {
      return of(this.getAnnonceDetails());
    }
  }

  getAnnonceDetails(): Annonce {
    return {
      idApp: 0,
      status: true,
      addresse: "",
      ville: "",
      pays: "",
      date_disponiblite:new Date,
      nbrChambre: 0,
      imageModels: [],
      typeLogement: TypeLogement.APPARTEMENT,
      description: "",
      montantContrubition: 0,
      nbrPersonne: 0,
      userId:""
    };
  }
}

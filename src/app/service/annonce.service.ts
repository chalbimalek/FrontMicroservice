import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from '../component/model/Annonce';
import { Equipement } from '../component/model/Equipement';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = 'http://localhost:8083/annonce/Annonce'; // URL de la Gateway

  constructor(private userservice:UserService,private http: HttpClient) {}

  addAppartementStep1(categorie: string): Observable<any> {
    const userId = this.userservice.getUserIdFromToken();
    const params = new HttpParams()
      .set('userId', userId)
      .set('categorie', categorie);
    return this.http.post(`${this.apiUrl}/step1`, null, { params });

  }


  addAppartementStep2(details: any): Observable<string> {
    const userId = this.userservice.getUserIdFromToken();

    // Formatage des dates au format 'yyyy-MM-dd'
    const dateDebutFormatted = this.formatDate(details.dateDebut);
    const dateFinFormatted = this.formatDate(details.dateFin);

    const params = new HttpParams()
      .set('userId', userId)
      .set('montantContribution', details.montantContribution.toString())
      .set('dateDebut', dateDebutFormatted)
      .set('dateFin', dateFinFormatted)
      .set('nbrLocateurs', details.nbrLocateurs.toString())
      .set('lit', details.lit.toString())
      .set('chambre', details.chambre.toString())
      .set('salleDeBain', details.salleDeBain.toString())
      .set('typeLogement', details.typeLogement)
      .set('optionsReservation', details.optionsReservation)
      .set('equipement', details.equipement);

    return this.http.post<string>(`${this.apiUrl}/step2`, null, { params });
  }

  // Méthode pour formater la date au format 'yyyy-MM-dd'
  private formatDate(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  addAppartementStep3(details: any): Observable<string> {
    const userId = this.userservice.getUserIdFromToken();
    const params = new HttpParams()
      .set('userId', userId)
      .set('description', details.description) // Ajoutez ici tous les champs nécessaires pour step3
      .set('adresse', details.adresse)
      .set('ville', details.ville)
      .set('pays', details.pays)
      .set('numero', details.numero.toString());

    return this.http.post<string>(`${this.apiUrl}/step3`, null, { params });
  }


  step4(formData: FormData): Observable<any> {
    const userId = this.userservice.getUserIdFromToken();
    const url = `${this.apiUrl}/step4/${userId}`;  // Adjust URL to match backend if using PathVariable
    return this.http.post<any>(url, formData);
  }

  getStep1Data(): Observable<any> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.get<any>(`${this.apiUrl}/step1/${userId}`);
}

getStep2Data(): Observable<any> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.get<any>(`${this.apiUrl}/step2/${userId}`);
}

getStep3Data(): Observable<any> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.get<any>(`${this.apiUrl}/step3/${userId}`);
}


  addAppartement(request: FormData): Observable<Annonce> {
    const userId = this.userservice.getUserIdFromToken();
    return this.http.post<Annonce>(
      `${this.apiUrl}?userId=${userId}`,
      request
    );
  }

  getAllAppartements(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>("http://localhost:8083/annonce/Annonce");
  }
  getAppartementsByCategorie(categorie: string): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/cat/${categorie}`);
  }

  getAppartementByid(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
  }

  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>('http://localhost:8083/annonce/equipement');
  }





}

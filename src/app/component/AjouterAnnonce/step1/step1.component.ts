import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Observable, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Annonce, TypeLogement } from '../../model/Annonce';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {
    form: FormGroup;

    constructor(private router:Router, private fb: FormBuilder, private Annonceservice: AnnonceService, private sannitizer: DomSanitizer) {
      this.form = this.fb.group({
        categorie: ['']
      });
    }

    ngOnInit(): void {
      this.loadStep1Data();
  }
  submitStep1() {
    const categorie = this.form.get('categorie')?.value;

    this.Annonceservice.addAppartementStep1(categorie).subscribe(
      (response) => {
        console.log('Étape 1 validée !', response);
        this.router.navigate(['/step2']);
      },
      (error) => {
        console.error('Erreur lors de l’étape 1', error);
      }
    );
  }

  loadStep1Data() {
    this.Annonceservice.getStep1Data().subscribe(
      (categorie) => {
        this.form.patchValue({ categorie });
      },
      (error) => console.error('Erreur chargement étape 1 :', error)
    );
}








}

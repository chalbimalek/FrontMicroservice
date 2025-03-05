import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Equipement } from '../../model/Equipement';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
form: FormGroup;
equipements: Equipement[] = [];
selectedEquipements: number[] = [];

    constructor(private router:Router, private fb: FormBuilder, private Annonceservice: AnnonceService, private sannitizer: DomSanitizer) {
      this.form = this.fb.group({
        montantContrubition: [''],  // Corrected here
        date_debut: [new Date(), Validators.required],  // Date de début, initialisée avec la date actuelle
        date_Fin: [new Date(), [Validators.required, this.dateFinValidator.bind(this)]], // Fix here
        optionsReservation: [''],
        equipement: [[]],  // Initialisé comme un tableau vide
        nbrlocateurs: [''],
        typeLogement: [''],
        lit: [''],
        chambre: [''],
        salledeBain: [''],
        description: [''],
        numero: [''],
        adresse: [''],
        ville: [''],
        pays: [''],
        imageFiles: [null]
      });

    }

    loadEquipements() {
      this.Annonceservice.getEquipements().subscribe((data) => {
        this.equipements = data;
      });
    }

    toggleEquipement(id: number) {
      if (this.selectedEquipements.includes(id)) {
        this.selectedEquipements = this.selectedEquipements.filter(e => e !== id);
      } else {
        this.selectedEquipements.push(id);
      }
      this.form.patchValue({ equipement: this.selectedEquipements }); // Harmonisation du champ
    }


      dateFinValidator(control: any): { [key: string]: any } | null {
    const date_debut = this.form?.get('date_debut')?.value;
    const date_fin = control.value;

    if (date_debut && date_fin && new Date(date_fin) < new Date(date_debut)) {
      return { invalidDate: 'La date de fin doit être après la date de début' };
    }
    return null;
  }
ngOnInit(): void {
  this.loadEquipements();


  this.loadStep2Data();
}


  loadStep2Data() {
    this.Annonceservice.getStep2Data().subscribe(
      (data) => {
        this.selectedEquipements = data.equipement || []; // Ajoute cette ligne pour stocker les équipements sélectionnés
        this.form.patchValue(data);
      },
      (error) => console.error('Erreur chargement étape 2 :', error)
    );
}
  goBack() {
    this.router.navigate(['/step1']); // Navigate back to Step 2
  }

submitStep2() {
  const details = {
    montantContribution: this.form.get('montantContrubition')?.value,
    dateDebut: this.form.get('date_debut')?.value,
    dateFin: this.form.get('date_Fin')?.value,
    nbrLocateurs: this.form.get('nbrlocateurs')?.value,
    lit: this.form.get('lit')?.value,
    chambre: this.form.get('chambre')?.value,
    salleDeBain: this.form.get('salledeBain')?.value,
    typeLogement: this.form.get('typeLogement')?.value,
    optionsReservation: this.form.get('optionsReservation')?.value,
    equipement: this.form.get('equipement')?.value
  };

  this.Annonceservice.addAppartementStep2(details).subscribe(
    (response) => {
      console.log('Étape 2 validée !', response); // Affiche le message renvoyé par le backend
      this.router.navigate(['/step3']);

    },
    (error) => {
      console.error('Erreur lors de l’étape 2', error);
    }
  );
}
}

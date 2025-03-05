import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/service/annonce.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component {
 newCollocationFormGroup!: FormGroup;

    constructor(private httpClient:HttpClient,private router:Router, private fb: FormBuilder, private Annonceservice: AnnonceService, private sannitizer: DomSanitizer) {

      this.newCollocationFormGroup = this.fb.group({
        addresse: [''],
        ville: [''],
        pays: [''],
        numero: [''],
        description: ['']
      });

    }

  step = 1;
  category = '';
  details: any = {};
  ngOnInit(): void {
    this.loadStep3Data();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 500);
  }
  loadStep3Data() {
    this.Annonceservice.getStep3Data().subscribe(
      (data) => {
        this.newCollocationFormGroup.patchValue(data);
      },
      (error) => console.error('Erreur chargement étape 3 :', error)
    );
}


  goBack() {
    this.router.navigate(['/step2']); // Navigate back to Step 2
  }
  submitStep3() {
    if (this.newCollocationFormGroup.valid) {
      const formValues = this.newCollocationFormGroup.value;

      const data = {
        adresse: formValues.addresse,
        ville: formValues.ville,
        pays: formValues.pays,
        numero: formValues.numero,
        description: formValues.description
      };

      this.Annonceservice.addAppartementStep3(data).subscribe(
        (response) => {
          console.log('Annonce ajoutée avec succès :', response);
          this.router.navigate(['/step4']); // Navigate to Step 4
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'annonce:', error);
        }
      );
    }
  }


 ngAfterViewInit(): void {
      this.initMap();

      // Forcer Leaflet à recalculer la taille après un petit délai
      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);
    }



  map!: any;
marker!: L.Marker; // Variable pour stocker le marqueur
@ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
initMap(): void {
  if (this.map) {
    return; // Évite d'initialiser plusieurs fois
  }

  // Créer la carte (centrée par défaut en Tunisie si la géolocalisation échoue)
  this.map = L.map('map', {
    center: [35.9881, 9.9138],
    zoom: 6.5
  });

  // Ajouter le fond de carte OpenStreetMap
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  tiles.addTo(this.map);

  // Définir l'icône personnalisée
  const customIcon = L.icon({
    iconUrl: 'assets/marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Essayer d'obtenir la position actuelle de l'utilisateur
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Centrer la carte et placer le marqueur à la position de l'utilisateur
      this.map.setView([lat, lng], 12);
      this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
      this.marker.bindPopup("Votre position actuelle").openPopup();
    },
    () => {
      // En cas d'erreur, placer un marqueur par défaut en Tunisie
      this.marker = L.marker([35.9881, 9.9138], { icon: customIcon }).addTo(this.map);
      this.marker.bindPopup("Position non trouvée, valeur par défaut").openPopup();
    }
  );

  // Écouter les clics sur la carte pour déplacer le marqueur
  this.map.on('click', (event: any) => {
    const { lat, lng } = event.latlng;
    this.marker.setLatLng([lat, lng]);
    this.getAddressFromCoordinates(lat, lng);
  });

  // Corriger l'affichage si la carte est cachée au chargement
  setTimeout(() => {
    this.map.invalidateSize();
  }, 500);
}

getAddressFromCoordinates(latitude: number, longitude: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  this.httpClient.get(url).subscribe((response: any) => {
    const address = response.display_name;
    const city = response.address.city || response.address.village || response.address.town || response.address.hamlet || '';
    const country = response.address.country;

    this.newCollocationFormGroup.controls['addresse'].setValue(address);
    this.newCollocationFormGroup.controls['ville'].setValue(city);
    this.newCollocationFormGroup.controls['pays'].setValue(country);
  }, error => {
    console.error('Error fetching reverse geocoding data:', error);
  });
}
}

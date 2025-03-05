import { Component, ElementRef, ViewChild } from '@angular/core';
import { Annonce, TypeLogement } from '../model/Annonce';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Observable, Subscriber } from 'rxjs';
import { FileHandle } from '../model/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addannonce',
  templateUrl: './addannonce.component.html',
  styleUrls: ['./addannonce.component.css']
})
export class AddannonceComponent {
  requestData: Annonce = {
    status: false,
    addresse: '',
    ville: '',
    pays: '',
    date_Fin:new Date,
    date_debut:new Date,
       chambre: 0,
    imageModels: [],
    typeLogement: TypeLogement.APPARTEMENT,
    description: '',
    montantContrubition: 0,
    nbrPersonne: 0,
    userId:""
  };


  file = [];

    newCollocationFormGroup!: FormGroup;
    form: FormGroup;

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private Annonceservice: AnnonceService, private sannitizer: DomSanitizer) {
      this.newCollocationFormGroup = new FormGroup({
        addresse: new FormControl(''),
        ville: new FormControl(''),
        pays: new FormControl(''),

      });
      this.form = this.fb.group({
        categorie: [''],
        montantContribution: [''],  // Corrected here
        dateDebut: [new Date()],  // Initialize with a Date object
  dateFin: [new Date()],
        optionsReservation: [''],
        equipement: [''],
        nbrLocateurs: [''],
        typeLogement: [''],
        lit: [''],
        chambre: [''],
        salleDeBain: [''],
        description: [''],
        numero: [''],
        adresse: [''],
        ville: [''],
        pays: [''],
        imageFiles: [null]
      });
    }

  step = 1;
  category = '';
  details: any = {};
  descriptionData: any = {};
  imageFiles: File[] = [];




 ajouterAnnonce1() {
    console.log('Request Data:', this.requestData); // Debugging
    const formData = this.preparedFormData(this.requestData);
    this.Annonceservice.addAppartement(formData).subscribe(
      response => {
        console.log('Annonce ajoutée avec succès', response);
      },
      error => {
        console.error('Erreur lors de l’ajout de l’annonce', error);
      }
    );
  }
  preparedFormData(product :Annonce):FormData{
    this.requestData.addresse=this.newCollocationFormGroup.get('addresse')!.value;
    this.requestData.ville=this.newCollocationFormGroup.get('ville')!.value;
    this.requestData.pays=this.newCollocationFormGroup.get('pays')!.value;
    const formData =new FormData();
    formData.append(
      'request',
      new Blob ([JSON.stringify(this.requestData)], {type :'application/json'})
);
        for(var i = 0 ;i <product.imageModels.length; i++){
          formData.append(
            'imageFile',
            product.imageModels[i].file,
            product.imageModels[i].file.name
          );
        }
        return formData;
  }

  myImage!: Observable<any>;
  base64code!: any;
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //console.log(file)
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      // console.log(d)
      this.myImage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }

  }



  onFileSelecteddd(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const FileHandle:FileHandle ={
        file:file,
        url:this.sannitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.requestData.imageModels.push(FileHandle);
    }
  }
  onFileSelectedd(event: any) {
    if (event.target.files) {
      const files = event.target.files; // Get all selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sannitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        };
        this.requestData.imageModels.push(fileHandle);
      }
    }
  }

  removeImage(i:number){
    this.requestData.imageModels.splice(i,1)
  }
  fileDropped(file_handle:FileHandle){
      this.requestData.imageModels.push(file_handle);
  }
  @ViewChild('selectfile') selectfile!: ElementRef<HTMLInputElement>;

    ngAfterViewInit(): void {
      this.initMap();

      // Forcer Leaflet à recalculer la taille après un petit délai
      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);
    }
    ngOnInit(): void {
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 500);
    }


  map!: any;
marker!: L.Marker; // Variable pour stocker le marqueur
@ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

initMap(): void {
  if (this.map) {
    return; // Évite d'initialiser plusieurs fois
  }

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



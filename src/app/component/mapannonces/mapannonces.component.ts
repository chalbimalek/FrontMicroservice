import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { AnnonceService } from 'src/app/service/annonce.service';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { Annonce } from '../model/Annonce';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-mapannonces',
  templateUrl: './mapannonces.component.html',
  styleUrls: ['./mapannonces.component.css']
})
export class MapannoncesComponent {
details(id:any) {
  this.router.navigate(['/detailAnnonce', id]); // Correction de la syntaxe
}
  public Annonces: Annonce[] = [];
  public selectedPopup: any = null;  // Variable to hold the popup content

  constructor(
    private Annonceservice: AnnonceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private imageProcessingService: ImageProcessingService,
    private httpClient: HttpClient
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  map!: any;
  marker!: L.Marker;
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 500);
  }

  initMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
      center: [35.9881, 9.9138],
      zoom: 6.5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    this.listeAnnonce();
  }

  public listeAnnonce() {
    this.Annonceservice.getAllAppartements()
      .pipe(
        map((x: Annonce[]) => x.map((product: Annonce) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Annonce[]) => {
          console.log(resp);
          this.Annonces = resp;
          this.addMarkersToMap();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  addMarkersToMap() {
    if (!this.map) {
      console.error('La carte n\'est pas encore initialisée.');
      return;
    }

    const customIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    this.Annonces.forEach(annonce => {
      if (annonce.addresse) {
        this.getCoordinatesFromAddress(annonce.addresse).subscribe((coordinates: any) => {
          if (coordinates && coordinates[0]) {
            const lat = coordinates[0]?.lat;
            const lon = coordinates[0]?.lon;

            if (lat && lon) {
              const marker = L.marker([lat, lon], { icon: customIcon })
                .addTo(this.map)
                .on('click', () => {
                  // Set the selected popup content on marker click
                  this.selectedPopup = {
                    idApp: annonce.idApp,  // Ensure idApp is included
                    ville: annonce.ville,
                    addresse: annonce.addresse,
                    imageUrl: annonce.imageModels[0].url
                  };
                });
            } else {
              console.error('Coordonnées invalides pour l\'adresse: ', annonce.addresse);
            }
          } else {
            console.error('Aucune coordonnée trouvée pour l\'adresse: ', annonce.addresse);
          }
        });
      }
    });
  }

  getCoordinatesFromAddress(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
    return this.httpClient.get(url);
  }

  closePopup() {
    this.selectedPopup = null;  // To close the popup/modal
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Annonce, TypeLogement } from '../../model/Annonce';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Observable, Subscriber } from 'rxjs';
import { FileHandle } from '../../model/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component {

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

    constructor(private router :Router,private fb: FormBuilder, private httpClient: HttpClient, private Annonceservice: AnnonceService, private sannitizer: DomSanitizer) {
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
    goBack() {
      this.router.navigate(['/step3']); // Navigate back to Step 2
    }
    addimage() {
      console.log('Request Data:', this.requestData); // Debugging

      // Prepare the form data for upload
      const formData = this.preparedFormData(this.requestData);

      // Make the API call to upload the image data
      this.Annonceservice.step4(formData).subscribe(
        response => {
          console.log('Annonce ajoutée avec succès', response);
          this.router.navigate(['/ListeAnnonce'])
        },
        error => {
          console.error('Erreur lors de l’ajout de l’annonce', error);
        }
      );
    }
  preparedFormData(product :Annonce):FormData{
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
}

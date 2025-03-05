import { FileHandle } from "./FileHandle";

export enum TypeLogement {
  STUDIO = 'STUDIO',
  APPARTEMENT = 'APPARTEMENT',
  MAISON = 'MAISON',
  VILLA = 'VILLA'
}

export class Annonce {
  idApp?: number; // ID facultatif
  status: boolean;
  addresse: string;
  ville: string;
  pays: string;
  date_debut: Date;
  date_Fin: Date;

  chambre: number;
  imageModels: FileHandle[]; // Changed from 'photos' to 'imageModels'
  typeLogement: TypeLogement;
  description: string;
  montantContrubition: number;
  nbrPersonne: number;
  //categorie: string; // Ou utiliser un Enum pour la catégorie si tu préfères
  userId:string;

  constructor(
    status: boolean,
    addresse: string,
    ville: string,
    pays: string,
    date_debut: Date,
    date_Fin: Date,
    userId:string,

    chambre: number,
    imageModels: FileHandle[],  // Modified to accept image models
    typeLogement: TypeLogement,
    description: string,
    montantContrubition: number,
    nbrPersonne: number,
    idApp?: number
  ) {
    this.status = status;
    this.addresse = addresse;
    this.ville = ville;
    this.pays = pays;
    this.date_debut = date_debut;
    this.date_Fin = date_Fin;

    this.userId=userId;
    this.chambre = chambre;
    this.imageModels = imageModels; // Changed to map image models
    this.typeLogement = typeLogement;
    this.description = description;
    this.montantContrubition = montantContrubition;
    this.nbrPersonne = nbrPersonne;
    if (idApp) this.idApp = idApp;
  }
}

export class Details {
  userId: string;
  montantContribution: number;
  dateDebut: Date; // Vous pouvez utiliser Date si vous voulez gérer les dates
  dateFin: Date;   // Vous pouvez utiliser Date si vous voulez gérer les dates
  nbrLocateurs: number;
  lit: number;
  chambre: number;
  salleDeBain: number;
  typeLogement: string; // Changez selon votre type réel (enum ou string)
  optionsReservation: string; // Changez selon votre type réel
  equipement: string;  // Changez selon votre type réel

  constructor(
    userId: string,
    montantContribution: number,
    dateDebut: Date,
    dateFin: Date,
    nbrLocateurs: number,
    lit: number,
    chambre: number,
    salleDeBain: number,
    typeLogement: string,
    optionsReservation: string,
    equipement: string
  ) {
    this.userId = userId;
    this.montantContribution = montantContribution;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.nbrLocateurs = nbrLocateurs;
    this.lit = lit;
    this.chambre = chambre;
    this.salleDeBain = salleDeBain;
    this.typeLogement = typeLogement;
    this.optionsReservation = optionsReservation;
    this.equipement = equipement;
  }
}

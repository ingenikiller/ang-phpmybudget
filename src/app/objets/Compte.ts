export class Compte {
  numeroCompte: string;
  libelle: string;
  solde: number;
  associatedObjet: Array<{
    name: string;
    tabResult: Array<{
      somme: number;
    }>
  }>;

  constructor() {
    this.numeroCompte='';
    this.libelle='';
    this.solde=0;
    this.associatedObjet=Array();
  }

}

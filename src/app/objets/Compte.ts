export class Compte {
  numeroCompte: string;
  libelle: string;
  solde: number;
  SommeOperation: SommeOperation;
  ;

  constructor() {
    this.numeroCompte='';
    this.libelle='';
    this.solde=0;
    this.SommeOperation=new SommeOperation;
  }

}

export class SommeOperation {
  data: Array<{
      somme: number;
    }>
  ;

  constructor() {
    this.data=Array();
  }
}

export class Operation {
    operationId: number;
    noReleve: string;
    date: string;
    libelle: string;
    fluxId: number;
    modePaiementId: number;
    flux: string;
    montant: number;
    nocompte: string;
    verif: string;

    constructor() {
        this.operationId=0;
        this.noReleve='';
        this.date='';
        this.libelle='';
        this.fluxId=0;
        this.modePaiementId=0;
        this.flux='';
        this.montant=0;
        this.nocompte='';
        this.verif='';
    }
  
}
  

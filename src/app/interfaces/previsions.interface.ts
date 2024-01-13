

export interface PrevisionListeInterface {
  racine: ListePrevisionRacine;
  name: string;

  valeur: string;

  status: string;
}

/*export interface PrevisionTab {
  racine: ListePrevisionRacine;
  nbLineTotal: number;
  nbLine: number;

}*/

/*export interface FluxPrevisionInterface {
  tabResult: FluxDetailInterface[];
}*/

export interface ListePrevisionRacine{
  Periodes: ObjetJson;

  ListeFluxDepense: ListeFluxMouvements;

  ListeFluxRecette: ListeFluxMouvements;
}

export interface ObjetJson {
  data: any[];
}

export interface ListeFluxMouvements {
  
  data: FluxPrevision[];
}

export interface FluxPrevision{
  fluxId: number;
  flux: string;
  ListePrevision: PeriodePrevision;
  ListeOperation: PeriodePrevision;
}

export interface PeriodePrevision{
  data: MontantLigne[];
}


export interface MontantLigne {
  periode: string;
  ligneid: number;
  total: number;
}

export interface FluxDetailInterface {
  fluxId: number;
  flux: string;
  depense: string;
  associatedObjet: ListeGroupeMontantsInterface[];
}



export interface ListeGroupeMontantsInterface{
  tabResult: GroupeMontant[];
}

export interface GroupeMontant {
  periode: string;
  ligneId: number;
  total: number;
}



export interface PrevisionListeInterface {
  name: string;

  valeur: any[];

  status: string;
}

export interface PrevisionTab {
  tabResult: any[];
  nbLineTotal: number;
  nbLine: number;

}

/*export interface FluxPrevisionInterface {
  tabResult: FluxDetailInterface[];
}*/

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

import { Flux } from '../objets/Flux';


export interface FluxListeInterface {
  racine: ListeFluxRacine;

  status: string;
  
}

export interface ListeFluxRacine{
  ListeFlux: ListeFlux;
}


export interface ListeFlux {
  totalPage: number;
  totalLigne: number;
  page: number;
  data: Flux[];
}



/*export interface FluxListeInterface {
  name: string;

  valeur: FluxTab[];

  status: string;
}

export interface FluxTab {
  tabResult: Flux[];
  nbLineTotal: number;
  nbLine: number;
}*/

import { Flux } from '../objets/Flux';

export interface FluxListeInterface {
  name: string;

  valeur: FluxTab[];

  status: string;
}

export interface FluxTab {
  tabResult: Flux[];
  nbLineTotal: number;
  nbLine: number;
}

import { Compte } from '../objets/Compte';

export interface CompteListeInterface {
  name: string;

  valeur: CompteTab[];

  status: string;
}

export interface CompteTab {
  tabResult: Compte[];
}

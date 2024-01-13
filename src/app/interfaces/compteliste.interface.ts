import { Compte } from '../objets/Compte';

export interface CompteListeInterface {
  codeerr: string;
  racine: ListeComptesRacine;

  
}

export interface ListeComptesRacine{
  ListeComptes: ListeComptes;
}


export interface ListeComptes {
  totalPage: number;
  totalLigne: number;
  page: number;
  data: Compte[];
}

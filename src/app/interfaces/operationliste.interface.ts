import { Operation } from '../objets/Operation';

export interface OperationListeInterface {
  racine: ListeOperationsRacine;

  
}

export interface ListeOperationsRacine{
  ListeOperations: ListeOperations;

  status: string;

}


export interface ListeOperations {
  totalPage: number;
  totalLigne: number;
  page: number;
  data: Operation[];
}


/*
export interface OperationListeInterface {
  name: string;

  valeur: OperationTab[];

  status: string;
}

export interface OperationTab {
  tabResult: Operation[];
  nbLineTotal: number;
  nbLine: number;

}
*/
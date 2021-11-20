import { Operation } from '../objets/Operation';

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
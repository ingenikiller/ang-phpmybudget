import { ReponseAjax } from '../interfaces/reponseajax.interface';

export interface LoginReponse {
  valeur: ReponseAjax[];

  status: string;
}

export interface LoginTab {
  tabResult: ReponseAjax[];
}

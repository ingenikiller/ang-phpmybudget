import { ReponseAjax } from '../interfaces/reponseajax.interface';

export interface LoginReponse {
  //valeur: ReponseAjax[];
  racine: LoginReponse;
  
}

export interface LoginReponse {
  //tabResult: ReponseAjax[];
  status: string;
  name: string;
  valeur: string;
  message: string;
}

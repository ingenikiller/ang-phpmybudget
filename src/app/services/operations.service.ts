import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operation } from '../objets/Operation';
import { Subject } from 'rxjs';
import { OperationListeInterface } from '../interfaces/operationliste.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private listeOperations: Operation[];
  //isAuth: boolean;

  operationsListeSubject = new Subject<Operation[]>();
  nbTotalLigneSubject = new Subject<Number>();

  nbTotalLigne: number | undefined;
  nbLigne: Number | undefined;
  numeroCompte: String;
  page: number;

  constructor(private _httpClient: HttpClient) {
    this.listeOperations=Array();
    //this.getListeOperation();
    this.numeroCompte='';
    this.page=1;
  }

  

  emitOperationsListeSubject() {
    this.operationsListeSubject.next(this.listeOperations.slice());
  }

  emitnbTotalLigneSubject() {
    //this.nbTotalLigneSubject.next(this.nbTotalLigne.slice());
  }

  getListeOperation() {
    const token = localStorage.getItem('token');
    const url = 'api/api.php?domaine=operation&service=getliste&token=' + token+'&numeroCompte='+this.numeroCompte;
    this._httpClient.get<OperationListeInterface>(url)
        .subscribe(resultat => {
          /*if (resultat.racine.status === 'false') {

          } else {
            //alert('retour OK');
          }*/
          this.listeOperations = resultat.racine.ListeOperations.data;
          //console.log('nbtotal: '+resultat.valeur[0].nbLineTotal);
          this.nbTotalLigne=resultat.racine.ListeOperations.totalLigne;
          this.nbLigne=resultat.racine.ListeOperations.data.length;
          console.log('nb operations:' + this.listeOperations.length);
          this.emitOperationsListeSubject();
          //this.emitnbTotalLigneSubject();
        });
  }
}

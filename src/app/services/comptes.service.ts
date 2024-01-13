import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { CompteListeInterface } from '../interfaces/compteliste.interface';
import { Compte } from '../objets/Compte';
import { ReponseAjax } from '../../interfaces/reponseajax.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  private listeComptes: Array<Compte> =[];
  isAuth: boolean;

  compteListeSubject = new Subject<Compte[]>();

  emitCompteListeSubject() {
    this.compteListeSubject.next(this.listeComptes.slice());
  }

  // tslint:disable-next-line: variable-name
  constructor(private _httpClient: HttpClient) {
    this.isAuth=false;
    //this.listeComptes=Array();
    this.getListeCompte();
  }

  getListeCompte() {
    const token = localStorage.getItem('token');
    const url = '/api/api.php?domaine=compte&service=getliste&token=' + token;
    this._httpClient.get<CompteListeInterface>(url)
        .subscribe(resultat => {
          if (resultat.codeerr === 'SESSION_CLOSE') {
            console.log(resultat.codeerr);
            location.href='/login';
          } else {
            this.listeComptes = resultat.racine.ListeComptes.data;
            console.log('nb comptes:' + this.listeComptes.length);
            this.emitCompteListeSubject();
          }
        });
  }

  updateCompte(id: number, numeroCompte: string, libelle: string, solde: number) {
    const token = localStorage.getItem('token');
    let url = 'api/api.php?domaine=compte&service=update&token=' + token;
    const data: any[] = [
      {
        numeroCompte: numeroCompte,
        libelle: libelle,
        solde: solde
      }
    ]
    url += '&numeroCompte=' + numeroCompte + '&libelle=' + libelle + '&solde=' + solde;
    this._httpClient.get<ReponseAjax>(url)
      .subscribe(retour => {
        /*let reponse: ReponseAjax;
        //TODO
        reponse = retour[0];
        if (reponse.status === 'OK') {
          this.getListeCompte();
        } else {
          alert(reponse.message);
        }*/
    });

    this.listeComptes[id].libelle = libelle;
    this.listeComptes[id].solde = solde;
  }
/*
  retourneListeCompte(): Observable<CompteListeInterface[]> {
    const token = localStorage.getItem('token');
    const url = 'api//api.php?domaine=compte&service=getliste&token=' + token;
    return this._httpClient.get<CompteListeInterface[]>(url);
  }
*/

}

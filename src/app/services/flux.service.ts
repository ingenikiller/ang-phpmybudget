import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FluxListeInterface } from '../interfaces/fluxliste.interface';
import { Flux } from '../objets/flux';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FluxService {

  // listeFlux: Flux[];

  constructor(private _httpClient: HttpClient) { }

  getListeFlux(numeroPage: number, comptePrincipal: string, compteDestination: string ): Observable<FluxListeInterface[]> {
    const token = localStorage.getItem('token');
    let url = 'http://localhost/phpmybudget/api.php?domaine=flux&service=getliste&token=' + token;
    url += '&numeroPage=' + numeroPage + '&comptePrincipal=' + comptePrincipal + '&compteDestination=' + compteDestination;
    return this._httpClient.get<FluxListeInterface[]>(url);
  }

  getListeFluxParams(params: string): Observable<FluxListeInterface[]> {
    const token = localStorage.getItem('token');
    const url = 'http://localhost/phpmybudget/api.php?domaine=flux&service=getliste&token=' + token + '&' + params;
    // url += '&numeroPage=' + numeroPage + '&comptePrincipal=' + comptePrincipal + '&compteDestination=' + compteDestination;
    return this._httpClient.get<FluxListeInterface[]>(url);
  }

  getOne(fluxId: string): Observable<Flux[]> {
    const token = localStorage.getItem('token');
    let url = 'http://localhost/phpmybudget/api.php?domaine=flux&service=getone&token=' + token;
    url += '&fluxId=' + fluxId;
    return this._httpClient.get<Flux[]>(url);
  }

}

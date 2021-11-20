import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flux } from '../objets/flux';
import { Observable } from 'rxjs';
import { SegmentListeInterface } from '../interfaces/segment.interface';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  listeFlux: Flux[];

  constructor(private _httpClient : HttpClient) { }


  getModePaiement(): Observable<SegmentListeInterface[]> {
    const token = localStorage.getItem('token');
    const url = 'http://localhost/phpmybudget/api.php?domaine=segment&service=getsegment&cleseg=MODPAI&token=' + token;
    return this._httpClient.get<SegmentListeInterface[]>(url);

  }


}

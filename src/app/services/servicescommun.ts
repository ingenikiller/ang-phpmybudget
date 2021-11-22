import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
  export class OperationsService {
  
    
    
    constructor(private _httpClient: HttpClient) {}


    public getListeAnnee() {
        const token = localStorage.getItem('token');
            const url = 'api/api.php?domaine=operation&service=getliste&token=' + token+'&numeroCompte='+this.numeroCompte;
            this._httpClient.get<any>(url)
                .subscribe(resultat => {
                if (resultat.status === 'false') {

                } else {
                    //alert('retour OK');
                }
                return 
                });
        }
    }


  }
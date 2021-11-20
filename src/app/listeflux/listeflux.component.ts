import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { FluxListeInterface } from '../interfaces/fluxliste.interface';
import { Compte } from '../objets/Compte';
import { Flux } from '../objets/Flux';
import { ComptesService } from '../services/comptes.service';


@Component({
  selector: 'app-listeflux',
  templateUrl: './listeflux.component.html',
  styleUrls: ['./listeflux.component.css']
})
export class ListefluxComponent implements OnInit {

  public pageSize = 20;
  public pageIndex = 0;
  public totalSize = 0;
  pageEvent: PageEvent | undefined;
  
  public model: any = {};

  listeFlux!: Flux[];

  private compteSubscription: Subscription | undefined;
  listeCompte: Compte[] | undefined;

  constructor(private _httpClient: HttpClient, private compteService: ComptesService) { }

  ngOnInit(): void {
    this.compteSubscription = this.compteService.compteListeSubject.subscribe(
      (comptes: Compte[]) => {
        this.listeCompte = comptes;
      }
    );
    

    this.getListeFlux(true);
  }

  public majPagination(event :PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    /*console.log('appel liste '+event.pageIndex);
    console.log('appel nb/page '+event.pageSize);
    //console.log('appel nb/page '+event.);
    console.log('appel total '+event.length);*/
    this.getListeFlux();
    return event;
  }

  getListeFlux(majcompoMagination: boolean = false) {
    console.log('appel service');
    
    const token = localStorage.getItem('token');
    let params = '&token=' + token+'&numeroPage='+(this.pageIndex+1)+'&nbLigneParPage='+this.pageSize;
    if(this.model.comptePrincipal!=undefined) {
      params+='&comptePrincipal='+this.model.comptePrincipal;
    }
    if(this.model.compteDestination!=undefined) {
      params+='&compteDestination='+this.model.compteDestination;
    }


    let url='api/phpmybudget/api.php?domaine=flux&service=getliste'+params;
    this._httpClient.get<FluxListeInterface>(url)
        .subscribe(resultat => {
          if (resultat.status === 'false') {

          } else {
            //alert('retour OK');
          }
          this.listeFlux = resultat.valeur[0].tabResult;
          if(majcompoMagination){
            console.log('maj pagination');
            this.totalSize=resultat.valeur[0].nbLineTotal;
            this.pageSize=resultat.valeur[0].nbLine;
            this.pageIndex=0;
          }
          
          console.log('nb operations:' + this.listeFlux.length);
          //this.emitOperationsListeSubject();
          //this.emitnbTotalLigneSubject();
        });
  }
}

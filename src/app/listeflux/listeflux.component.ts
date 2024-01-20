import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Subscription } from 'rxjs';
import { FluxListeInterface } from '../interfaces/fluxliste.interface';
import { Compte } from '../objets/Compte';
import { Flux } from '../objets/Flux';
import { ComptesService } from '../services/comptes.service';
import {
  MatLegacyDialog as MatDialog,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef
} from '@angular/material/legacy-dialog';

import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-listeflux',
  templateUrl: './listeflux.component.html',
  styleUrls: ['./listeflux.component.css']
})
export class ListefluxComponent implements OnInit {

  public pageIndex = 0;
  public pageSize = 0;
  public totalSize = 100;
  
  pageEvent: PageEvent | undefined;
  
  public model: any = {};

  listeFlux!: Flux[];

  private compteSubscription: Subscription | undefined;
  listeCompte: Compte[] | undefined;

  constructor(private _httpClient: HttpClient, private compteService: ComptesService, public popupEditionFlux: MatDialog) { }

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


    let url='/api/api.php?domaine=flux&service=getliste'+params;
    this._httpClient.get<FluxListeInterface>(url)
        .subscribe(resultat => {
          if (resultat.status === 'false') {

          } else {
            //alert('retour OK');
          }
          this.listeFlux = resultat.racine.ListeFlux.data;
          if(majcompoMagination){
            console.log('maj pagination');
            //this.totalSize=resultat.racine.ListeFlux.totalLigne;
            //this.page=1;
            this.pageSize=resultat.racine.ListeFlux.data.length;
            this.totalSize=resultat.racine.ListeFlux.totalLigne;
            //alert(resultat.racine.ListeFlux.totalLigne);
          }
          
          console.log('nb operations:' + this.listeFlux.length);
          console.log('nb operations total:' + this.totalSize);
          //this.emitOperationsListeSubject();
          //this.emitnbTotalLigneSubject();
        });
  }

  editerFlux(fluxId:string) {
    console.log('Edition '+fluxId);
    
    const dialogRef = this.popupEditionFlux.open(PopupEditionFlux, { 
      disableClose: true,
      height: '480px',
      width: '600px'

      //data: { name: this.name, animal: this.animal, appelant: this },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.animal = result;
      //this.refresh();
    });

  }


}

/***********************************************************
  POPUP edition
 */
@Component({
  selector: 'popup.edition.flux',
  templateUrl: 'popup.edition.flux.html',
})
export class PopupEditionFlux {
  constructor(
    public dialogRef: MatDialogRef<PopupEditionFlux> //,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
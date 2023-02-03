import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogContentExampleDialog } from '../appDialog/edition-prevision-entete-liste/edition-prevision-entete-liste.component';
import { FluxDetailInterface,  GroupeMontant, PrevisionListeInterface } from '../interfaces/previsions.interface';


@Component({
  selector: 'app-previsions',
  templateUrl: './previsions.component.html',
  styleUrls: ['./previsions.component.css']
})
export class PrevisionsComponent implements OnInit {

  private numeroCompte: String | undefined;

  annee: String| undefined;
  mois!:number;
  retourService!:PrevisionListeInterface;

  
  tabRecapDepensesPrevisions!: number[];
  tabRecapDepensesReelles!: number[];
  tabRecapRecettesPrevisions!: number[];
  tabRecapRecettesReelles!: number[];

  cumulDifferenceDepenses: number=0;
  cumulDifferenceRecettes: number=0;

  cumulPrevisionsDepenses!: string;
  cumulReellesDepenses!: string;
  cumulTotalDepenses!: string;


  cumulPrevisionsRecettes!: string;
  cumulReellesRecettes!: string;
  cumulTotalRecettes!: string;

  cumulTotal!:string;

  //isDataLoaded: boolean=false;
  public model: any = {};


  constructor(private route:ActivatedRoute,private _httpClient: HttpClient,private router: Router, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.numeroCompte = params['numeroCompte'];
      this.annee='2021';
      
      this.tabRecapDepensesPrevisions = Array(12);
      this.tabRecapDepensesReelles = Array(12);

      this.tabRecapRecettesPrevisions = Array(12);
      this.tabRecapRecettesReelles = Array(12);
    });
  }

  ngOnInit(): void {
    let date = new Date();
    this.mois=date.getMonth();
    this.model.annee=this.annee;
    this.model.flagPinel='complet';
    this.getListePrevisions();
  }

  getListePrevisions() {
    console.log('appel service');
    
    const token = localStorage.getItem('token');
    let params = '&token=' + token+'&numeroCompte='+this.numeroCompte+'&flagPinel='+this.model.flagPinel;
    
    let url='/api/api.php?domaine=prevision&service=getlisteannee&periode='+this.model.annee+params;
    this._httpClient.get<PrevisionListeInterface>(url)
      .subscribe(resultat => {
        if (resultat.status === 'false') {
          this.router.navigate(['/login']);
        } else {
          //alert('retour OK');
        }
        
        this.retourService=resultat;
        setTimeout(() =>{
          this.cumulPrevisionsDepenses = this.calculCumulAnnee(this.tabRecapDepensesPrevisions);
          this.cumulReellesDepenses = this.calculCumulAnnee(this.tabRecapDepensesReelles);
          this.cumulTotalDepenses = this.calculDifferenceDepensesAnnee().toFixed(2);
          this.cumulPrevisionsRecettes = this.calculCumulAnnee(this.tabRecapRecettesPrevisions);
          this.cumulReellesRecettes = this.calculCumulAnnee(this.tabRecapRecettesReelles);
          this.cumulTotalRecettes = this.calculDifferenceRecettesAnnee().toFixed(2);
          this.cumulTotal = this.calculTotalAnnee().toFixed(2);
        }, 500);
      });
  }

  /**
   * 
   * @param tab 
   * @returns 
   */
  calcultotalLigne(tab: GroupeMontant[]){
    let somme:number=0;
    for(let montant of tab) {
      somme+=Number(montant.total);
    }
    return somme.toFixed(2);
  }

  /**
   * 
   * @param type 
   * @param mois 
   * @param indice 
   * @param mode 
   * @returns 
   */
  calculCumul(type: number, mois: string, indice: number, mode: number) {
    let tab: FluxDetailInterface[];
    if(type==1) {
      tab = this.retourService.valeur[1].tabResult;
    } else {
      tab = this.retourService.valeur[2].tabResult;
    }
    let total: number=0
    
    for (let depense of tab) {
      total+=Number(depense.associatedObjet[indice].tabResult[Number(mois)-1].total);
    }

    if(type==1 ) {
      if(indice==0) {
        this.tabRecapDepensesPrevisions[Number(mois)-1]=total;
      } else {
        this.tabRecapDepensesReelles[Number(mois)-1]=total;
      }
    } else {
      if(indice==0) {
        this.tabRecapRecettesPrevisions[Number(mois)-1]=total;
      } else {
        this.tabRecapRecettesReelles[Number(mois)-1]=total;
      }
    }
    return total.toFixed(2);
  }
  
  
  calculCumulAnnee(tab: number[]) {
    let total: number=0;
    for(let montant of tab) {
      total+=montant;
    }
    return total.toFixed(2);
  }

  /**
   * 
   * @param mode dépenses=1, recettes=2
   * @param mois 
   * @returns 
   */
  calculDifferenceMois(mode: number, mois: string) {
    let prevision: number[];
    let reelle: number[];
    if(mode==1) {
      prevision=this.tabRecapDepensesPrevisions;
      reelle=this.tabRecapDepensesReelles;
    } else {
      prevision=this.tabRecapRecettesPrevisions;
      reelle=this.tabRecapRecettesReelles;
    }

    let diffrence=(prevision[Number(mois)-1]-reelle[Number(mois)-1]);

    return diffrence.toFixed(2);
  }

  calculTotalMois(mois:string) {
    let i = Number(mois)-1;
    
    let reelleDepenses=this.tabRecapDepensesReelles;
    let reelleRecettes=this.tabRecapRecettesReelles;

    return (reelleDepenses[i]+reelleRecettes[i]).toFixed(2);
  }

  calculDifferenceDepensesAnnee() {
    let total=0;
    let i:number=0;
    for (i=0;i<12;i++) { 
      total+=this.tabRecapDepensesPrevisions[i]-this.tabRecapDepensesReelles[i];
    }
    return total;
  }

  calculDifferenceRecettesAnnee() {
    let total=0;
    let i:number=0;
    for (i=0;i<12;i++) { 
      total+=this.tabRecapRecettesPrevisions[i]-this.tabRecapRecettesReelles[i];
    }
    return total;
  }

  calculTotalAnnee() {
    let total=0;
    let i:number=0;
    for (i=0;i<12;i++) { 
      total+=this.tabRecapDepensesReelles[i]+this.tabRecapRecettesReelles[i];
    }
    return total;
  }

  /**
   * détermine s'il y a une différence entre un prévision et un réel pour un flux et un mois:
   *  - si les deux sont différents
   *  - et si on est sur le mois en cours
   *  - et si le réel est différent de 0
   * @param tab 
   * @param periode 
   * @returns 
   */
  afficheBalance(tab: any, periode: string): boolean{
    let mois :number = Number(periode.substring(5)) -1;
    let prevision = Number(tab.associatedObjet[0].tabResult[mois].total);
    let reelle = Number(tab.associatedObjet[1].tabResult[mois].total);
    return prevision!=reelle&&mois==this.mois&&reelle!=0?true:false;
  }


  /**
   * 
   * @param montant 
   * @returns 
   */
  public formatMontant(montant: number){
    //console.log(montant);
    if(montant==0) {
      return '';
    } else {
      return Number(montant).toFixed(2);
    }
  }

  public openDialog(fluxid: number) {
    console.log('flux:'+fluxid);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      page: this,
      fluxid: fluxid,
      compte: this.numeroCompte,
      annee: this.annee
    };
    //let dialog = new MatDialog()
    const dialogRef = this.dialog.open(DialogContentExampleDialog, dialogConfig);
    /*dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });*/
  }
}

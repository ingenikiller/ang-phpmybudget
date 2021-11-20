import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { FluxDetailInterface,  GroupeMontant,  PrevisionListeInterface } from '../interfaces/previsions.interface';
import { Periode } from '../objets/Periode';

@Component({
  selector: 'app-previsions',
  templateUrl: './previsions.component.html',
  styleUrls: ['./previsions.component.css']
})
export class PrevisionsComponent implements OnInit {

  private numeroCompte: String | undefined;

  annee: String| undefined;

  retourService!:PrevisionListeInterface;

  listePeriode : Periode[] | undefined;

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

  i: number=0;
  //isDataLoaded: boolean=false;
  public model: any = {};


  constructor(private route:ActivatedRoute,private _httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.numeroCompte = params['numeroCompte'];
      this.annee='2021';

      //this.retourService=Array(3);
      
      this.tabRecapDepensesPrevisions = Array(12);
      this.tabRecapDepensesReelles = Array(12);

      this.tabRecapRecettesPrevisions = Array(12);
      this.tabRecapRecettesReelles = Array(12);

      /*this.cumulDifferenceDepenses=0;
      this.cumulDifferenceRecettes=0;*/
      this.getListePrevisions();
      delay(3000);
    });
  }

  ngOnInit(): void {
    
    
  }

  getListePrevisions() {
    console.log('appel service');
    
    const token = localStorage.getItem('token');
    let params = '&token=' + token+'&numeroCompte='+this.numeroCompte; //+'&numeroPage='+(this.pageIndex+1)+'&nbLigneParPage='+this.pageSize;
    /*if(this.model.comptePrincipal!=undefined) {
      params+='&comptePrincipal='+this.model.comptePrincipal;
    }
    if(this.model.compteDestination!=undefined) {
      params+='&compteDestination='+this.model.compteDestination;
    }*/


    let url='api/phpmybudget/api.php?domaine=prevision&service=getlisteannee&periode=2021'+params;
    this._httpClient.get<PrevisionListeInterface>(url)
        .subscribe(resultat => {
          if (resultat.status === 'false') {

          } else {
            //alert('retour OK');
          }
          //this.genereTableau(resultat.valeur);
          this.retourService=resultat;
          setTimeout(() =>{
            console.log('hide');
            //this.isDataLoaded=true;
            this.cumulPrevisionsDepenses = this.calculCumulAnnee(this.tabRecapDepensesPrevisions);
            this.cumulReellesDepenses = this.calculCumulAnnee(this.tabRecapDepensesReelles);
            this.cumulTotalDepenses = this.calculDifferenceDepensesAnnee().toFixed(2);
            this.cumulPrevisionsRecettes = this.calculCumulAnnee(this.tabRecapRecettesPrevisions);
            this.cumulReellesRecettes = this.calculCumulAnnee(this.tabRecapRecettesReelles);
            this.cumulTotalRecettes = this.calculDifferenceRecettesAnnee().toFixed(2);
            console.log ('nb appel:'+this.i);
          }, 1000);

          setTimeout(() =>{
            console.log ('nb appel2:'+this.i);
          }, 1000);
          /*
          this.listePeriode = resultat.valeur[0].tabResult;
          this.listeDepense = resultat.valeur[1].tabResult;
          this.listeRecette = resultat.valeur[2].tabResult;
          */
          //this.isDataLoaded=true;
          /*setTimeout(() =>{
            console.log('hide');
            this.isDataLoaded=true;
          }, 2000);
          console.log('sortie')*/
          /*this.listeFlux = resultat.valeur[0].tabResult;
          if(majcompoMagination){
            console.log('maj pagination');
            this.totalSize=resultat.valeur[0].nbLineTotal;
            this.pageSize=resultat.valeur[0].nbLine;
            this.pageIndex=0;
          }
          
          console.log('nb operations:' + this.listeFlux.length);*/
          //this.emitOperationsListeSubject();
          //this.emitnbTotalLigneSubject();
        });
  }
/*
  private genereTableau(data:any[]) {
    //var tableau = document.getElementById('liste');

    this.listePeriode = <Periode[]>data[0].tabResult;
    this.listeDepense = <FluxDetailInterface[]>data[1].tabResult;
    this.listeRecette = <FluxDetailInterface[]>data[2].tabResult;
  }
*/
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

  calculDifferenceMois(mode: number, mois: string) {
    //console.log('diff mois'+mode+mois);
    this.i++;
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

    if(mode==1) {
      this.cumulDifferenceDepenses+=diffrence;
    } else {
      this.cumulDifferenceRecettes+=diffrence;
    }

    return diffrence.toFixed(2);

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
}

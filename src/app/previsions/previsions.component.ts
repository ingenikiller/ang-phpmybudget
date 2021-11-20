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

  retourService!:any[];

  listePeriode : Periode[] | undefined;
  listeDepense!: FluxDetailInterface[];
  listeRecette!: FluxDetailInterface[];

  tabRecapDepensesPrevisions!: number[];
  tabRecapDepensesReelles!: number[];
  tabRecapRecettesPrevisions!: number[];
  tabRecapRecettesReelles!: number[];

  cumulDifferenceDepenses: number=0;
  cumulDifferenceRecettes: number=0;

  isDataLoaded: boolean=false;
  


  constructor(private route:ActivatedRoute,private _httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.numeroCompte = params['numeroCompte'];
      this.annee='2021';
      
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
    
    setTimeout(
      () => {
        //this.isAuth = true;
      }, 4000
    );
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
          //this.retourService=resultat.valeur;
          
          this.listePeriode = resultat.valeur[0].tabResult;
          this.listeDepense = resultat.valeur[1].tabResult;
          this.listeRecette = resultat.valeur[2].tabResult;
          
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

  private genereTableau(data:any[]) {
    //var tableau = document.getElementById('liste');

    this.listePeriode = <Periode[]>data[0].tabResult;
    this.listeDepense = <FluxDetailInterface[]>data[1].tabResult;
    this.listeRecette = <FluxDetailInterface[]>data[2].tabResult;
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
      tab = this.listeDepense;
    } else {
      tab = this.listeRecette;
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
    console.log('diff mois'+mode+mois);
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

  afficheDifferenceDepensesAnnee() {
    //console.log('cumul dep');
    return this.cumulDifferenceDepenses;
  }
  afficheDifferenceRecettesAnnee() {
    //console.log('cumul rec');
    return this.cumulDifferenceRecettes;
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
  
  
  
  private genereTableau2(data:any[]) {

    var tableau = document.getElementById('liste');

    let listePeriode = <Periode[]>data[0].tabResult;
    

    var entete = document.createElement('tr');
    entete.append(this.createElement('th','Flux'));
    for (let periode of listePeriode) {
      entete.append(this.createElement('th',periode.periode));
    }
    entete.append(this.createElement('th', listePeriode[0].annee));
    entete.append(this.createElement('th','AS'));
    tableau?.append(entete);


    var button=this.createElement('button','','btn btn-primary');
    button.setAttribute('id', 'creerCompte');
    button.setAttribute('onblur', 'creerCompte()');

   
    /*
    <button type="button" class="btn btn-primary" id="editerCompte" name="editerCompte" (click)="creerCompte()">
      <span class="oi oi-plus"></span>
    </button>*/

    

    document.getElementById('divtest')?.append(button);

  }

  createElement(type:string, valeur:string, classe:string=''){
    var element = document.createElement(type);
    element.innerHTML=valeur;
    element.setAttribute('class', classe);
    return element;
  }

  creerCompte() {
    console.log('clic creer ');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-periodes',
  templateUrl: './liste-periodes.component.html',
  styleUrls: ['./liste-periodes.component.css']
})
export class ListePeriodesComponent {
  data= Array();

  champSimple="Toto";

  public model: any = {};

  constructor() {
    this.data.push('titi');
    this.data.push('tata');
    this.data.push('toto');
  }

  public ajout() {
    console.log('click ajout');
    this.data.push(this.model.entree);
  }

  public affiche(){
    var chaine="";
    this.data.forEach(
      ligne=>chaine+=":"+ligne
    );
    alert(chaine);
  }



}

import { Component, OnInit } from '@angular/core';
import { ComptesService } from '../services/comptes.service';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { Compte } from '../objets/Compte';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listecomptes',
  templateUrl: './listecomptes.component.html',
  styleUrls: ['./listecomptes.component.css']
})
export class ListecomptesComponent implements OnInit {
  isAuth: boolean;

  model: any = {};

  listeCompte: Compte[];

  private compteSubscription: Subscription | undefined;

  constructor(private compteService: ComptesService) {
    this.isAuth=false;
    this.listeCompte=Array();
    //this.compteSubscription=null;
    
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
   }

  ngOnInit() {
    //this.listeCompte = this.compteService.getListeCompte();
    //this.listeCompte = this.compteService.listeCompte;
    //console.log('nb comptes:' + this.listeCompte.length);
    /*this.compteService.getListeCompte()
      .subscribe(
        resultat => {
          this.listeCompte = resultat.;
          //this.loaded = true;
        });*/
        this.compteSubscription = this.compteService.compteListeSubject.subscribe(
          (comptes: Compte[]) => {
            this.listeCompte = comptes;
          }
        );

  }

  open(content: String, i: number) {
    const compte: Compte = this.listeCompte[i];
    this.model.numeroCompte = compte.numeroCompte;
    this.model.libelle = compte.libelle;
    this.model.solde = compte.solde;
    /*this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      console.log('pass1');
      this.compteService.updateCompte(i, this.model.numeroCompte, this.model.libelle, this.model.solde);
    }, (reason: String) => {
      console.log('pass2');
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
    return false;
  }

  public editerCompte(compte: Compte) {
    console.log('clic edition '+compte.numeroCompte);
    //alert('clic');
    /*$('#content').modal({
      backdrop: 'static',
      keyboard: false
    });*/
    //return false;
    /*var myModal = new bootstrap.Modal(document.getElementById('boiteCompte'), {
      backdrop: 'static',
      keyboard: false
    });*/
  }

  public creerCompte() {
    console.log('clic creer ');
  }

}


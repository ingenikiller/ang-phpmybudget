import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InterfaceComponentPaginable } from '../interfaceProg/interfacecomponentpaginable';
import { Operation } from '../objets/Operation';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-listeoperations',
  templateUrl: './listeoperations.component.html',
  styleUrls: ['./listeoperations.component.css']
})
export class ListeoperationsComponent implements OnInit, InterfaceComponentPaginable {

  private operationSubscription: Subscription | undefined;

  listeOperations: Operation[];

  private numeroCompte: String;
  //params: Observable;
  constructor(private route: ActivatedRoute,private operationService: OperationsService) {
    this.numeroCompte='';
    this.listeOperations=Array();
    /*this.params=this.route.paramMap.pipe(
      switchMap(params => {
        this.numeroCompte = String(params.get('numeroCompte'));
        return null;//this.service.getHeroes();
      })
    );*/
    this.route.params.subscribe(params => {
      this.numeroCompte = params['numeroCompte'];
      
    });
    console.log('nocompte '+this.numeroCompte);
    this.operationService.numeroCompte=this.numeroCompte;
    this.lanceRecherche();

    setTimeout(
      () => {
        //this.isAuth = true;
      }, 4000
    );
/*
    this.operationSubscription = this.operationService.getListeOperation.subscribe(
      (operations: Operation[]) => {
        this.listeOperations = operations;
      }
    );
*/
  }

  lanceRecherche(): void {
    this.operationService.getListeOperation();
    //console.log('toto:'+this.operationService.nbTotalLigne);
  }


  ngOnInit(): void {
    
    this.operationSubscription = this.operationService.operationsListeSubject.subscribe(
      (operations: Operation[]) => {
        this.listeOperations = operations;
      }
    );

  }

}

import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Prevision } from 'src/app/objets/Prevision';
import { PrevisionsComponent } from 'src/app/previsions/previsions.component';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms'
/*
@Component({
  selector: 'app-edition-prevision-entete-liste',
  templateUrl: './edition-prevision-entete-liste.component.html',
  styleUrls: ['./edition-prevision-entete-liste.component.css']
})
export class EditionPrevisionEnteteListeComponent implements OnInit {

@Input() listePrevisions!: PrevisionsComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('init compo')
  }

  public openDialog(nocompte: string, fluxid: number, annee: string) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      page: this.listePrevisions
    }
    const dialogRef = this.dialog.open(DialogContentExampleDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}*/



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./edition-prevision-entete-liste.component.css']
})
export class DialogContentExampleDialog implements OnInit{

  private page!: PrevisionsComponent
  fluxid!: number;
  compte!:string;
  annee!:number;
  listePrevisions!: Prevision[];

  previsionsForm: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<DialogContentExampleDialog>,  
    @Inject(MAT_DIALOG_DATA) data:any,
    private _httpClient: HttpClient,
    private fb:FormBuilder) {
    this.page=data.page;
    this.fluxid=data.fluxid;
    this.compte=data.compte;
    this.annee=data.annee;

    this.previsionsForm = this.fb.group({
      //name: '',
      previsions: this.fb.array([])
    });
  }
    
  ngOnInit(): void {
    this.getListePrevisions();
  }

  get previsions() : FormArray {
    return this.previsionsForm.get("previsions") as FormArray
  }

  getListePrevisions() {
    const token = localStorage.getItem('token');
    let url='api/phpmybudget/api.php?domaine=previsionentete&service=getone&token='+token+'&noCompte='+this.compte+'&annee='+this.annee+'&fluxId='+this.fluxid;
    this._httpClient.get<any>(url)
    .subscribe(resultat => {
      if (resultat.status === 'false') {
        //this.router.navigate(['/login']);
      } else {
        //alert('retour OK');
      }
      //this.listePrevisions = resultat.valeur[0].tabResult;
      /*this.previsions.push(new FormControl(resultat.valeur[0].tabResult[0].mois));
      this.previsions.push(new FormControl(resultat.valeur[0].tabResult[1].mois));*/
      //console.log('ee:'+this.listePrevisions[0].montant);
      let tab = resultat.valeur[0].tabResult;
      for(let x in tab) {
        //console.log('valeur de x:'+x)
        this.previsions.insert(Number(x),new FormGroup({
          mois:new FormControl(tab[x].mois,[Validators.required])
      //completed:new FormControl(dat[x].completed,[Validators.required]),
      //priority:new FormControl(dat[x].priority,[Validators.required])
      }))
      }


    });
  }

  save():void {
    console.log('clic save');
    this.dialogRef.close();
    console.log('ee:'+this.listePrevisions[0].montant);
    this.page.getListePrevisions();
  }

}
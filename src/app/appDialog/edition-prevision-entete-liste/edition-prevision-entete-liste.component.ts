import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PrevisionsComponent } from 'src/app/previsions/previsions.component';
//import { MatDialogRef } from '@angular/material';

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

  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog implements OnInit{

  constructor(private dialogRef: MatDialogRef<DialogContentExampleDialog>) {

  }
    
  ngOnInit(): void {
      
  }

  save():void {
    console.log('clic save');
    this.dialogRef.close();
  }

}
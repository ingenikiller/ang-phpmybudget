import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { ListecomptesComponent } from './listecomptes/listecomptes.component';
import { MenuComponent } from './menu/menu.component';
import { ListeoperationsComponent } from './listeoperations/listeoperations.component';
import { PageoperationComponent } from './pageoperation/pageoperation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListefluxComponent } from './listeflux/listeflux.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';




import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input'
//import {MatRippleModule} from '@angular/material/m'
//import { MatDialogContentModule } from '@angular/material/';
import { PrevisionsComponent } from './previsions/previsions.component';
//import { EditionPrevisionEnteteListeComponent } from './appDialog/edition-prevision-entete-liste/edition-prevision-entete-liste.component';
import { DialogContentExampleDialog } from './appDialog/edition-prevision-entete-liste/edition-prevision-entete-liste.component'
import { PagePrevisionsComponent } from './page-previsions/page-previsions.component';
import { PopupEditionFlux } from './listeflux/listeflux.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { AcceuilstatistiquesComponent } from './acceuilstatistiques/acceuilstatistiques.component';
import { ListePeriodesComponent } from './liste-periodes/liste-periodes.component';
@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    ListecomptesComponent,
    MenuComponent,
    ListeoperationsComponent,
    PageoperationComponent,
    PaginationComponent,
    ListefluxComponent,
    PrevisionsComponent,
    //EditionPrevisionEnteteListeComponent,
    PagePrevisionsComponent,
    DialogContentExampleDialog,
    PopupEditionFlux,
    AcceuilstatistiquesComponent,
    ListePeriodesComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
//    MatPaginatorModule,
    MatDialogModule,
//    MatButtonModule,
//    NgbModule,
    MatInputModule,
    MaterialModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

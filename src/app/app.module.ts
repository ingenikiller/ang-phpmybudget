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

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
//import { MatDialogContentModule } from '@angular/material/';
import { PrevisionsComponent } from './previsions/previsions.component';
import { EditionPrevisionEnteteListeComponent } from './appDialog/edition-prevision-entete-liste/edition-prevision-entete-liste.component';

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
    EditionPrevisionEnteteListeComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

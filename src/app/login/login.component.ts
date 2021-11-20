import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReponseAjax } from '../../interfaces/reponseajax.interface';
import { LoginReponse } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  // private _httpClient: HttpClient;

  /*optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST,PUT,DELETE",
    'mon-entete-personnalise': 'maValeur'
  })
};*/

constructor(
  private router: Router, private _httpClient: HttpClient
) { }

  ngOnInit() {
  }

  login() {
    console.log('Tentative de connexion');
    
    this._httpClient.request<LoginReponse>('POST', 'api/phpmybudget/api.php?domaine=technique&service=gettoken&nom=' + this.model.username + '&motDePasse=' + this.model.password, {
      responseType:"json"} )
      .subscribe(retour => {
        let reponse: ReponseAjax;
        reponse = retour.valeur[0];
        if (reponse.status === 'OK') {
          localStorage.setItem('token', reponse.valeur);
          this.router.navigate(['/listecomptes']);
        } else {
          alert(reponse.message);
        }
    });
  }

  recupereToken(data :String) {
    alert(data);
    return 0;
  }

}

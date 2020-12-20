import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response,
  RequestOptions,
  ResponseOptions,
  ResponseContentType
} from "@angular/http";
import "rxjs/Rx";
import "rxjs/operator";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttplayerService {

  constructor(private http: Http) { }
  serverUrl = environment.baseUrl;
  listingUrl = 'list.php?'
  categoryUrl = 'c=list'
  ingredientsUrl = 'i=list'


  getCocktails(filterTxt) {
    let url = this.serverUrl+filterTxt
    return this.getQuery(url);
  }

  getCategories()
  {
    let url = this.serverUrl+this.listingUrl+this.categoryUrl
    return this.getQuery(url);
  }

  getIngredients()
  {
    let url = this.serverUrl+this.listingUrl+this.ingredientsUrl
    return this.getQuery(url);
  }

  getQuery(url,headers?) {
    if (!headers) {
      headers = new Headers();
    }
    var headerJson = { headers: headers };
    return this.http
      .get(url, headerJson)
      .map((response: Response) => {
        return { body: response.text(), status: response.status };
      })
      .catch(err => {
        return err
      });
  }

}

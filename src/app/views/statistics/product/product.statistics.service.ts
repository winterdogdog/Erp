import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpRequetInterface} from "../../../common/http/app.http.service";

@Injectable()
export class ProductStatistics {

  constructor(private http: HttpRequetInterface) {}

  getData(url) {
    return this.http.getData(url).map(result=>result.json());
  }
}

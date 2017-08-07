import {Injectable} from '@angular/core';
import {HttpRequetInterface} from "../../../common/http/app.http.service";

@Injectable()
export class RetailerStatistics {

  constructor(private http: HttpRequetInterface) {}

  getData(url) {
    return this.http.getData(url).map(result => result.json());
  }

  postData(url, data) {
    return this.http.postData(url, data).map(result => result.json());
  }
}

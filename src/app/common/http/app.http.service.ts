import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ServerConstant} from "../system/server";

@Injectable()
export class HttpRequetInterface {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append(ServerConstant.Authorization, ServerConstant.AuthorizationValue);
  }

  getData(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  postData(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}

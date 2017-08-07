
import {Injectable} from '@angular/core';
import {Finance} from './finance';
import {Http,Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FinanceService {
	private customUrl = './assets/data/finance.json';
    constructor(private http: Http) {}

    getFinance(): Observable<Finance[]> {
        return this.http.get(this.customUrl)
        				.map(this.extratData)
    //                 .toPromise()
    //                 .then(res => <Finance[]> res.json().data)
    //                 .then(data => { return data; });
    }
    private extratData(res: Response) {
    	let body = res.json();
  		return body.data || { };
    }
}




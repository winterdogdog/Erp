
import {Injectable} from '@angular/core';
import {Custom} from './custom';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomService {

    constructor(private http: Http) {}

    getCustoms() {
        return this.http.get('./assets/data/customs.json')
                    .toPromise()
                    .then(res => <Custom[]> res.json().data)
                    .then(data => { return data; });
    }
   
    


}




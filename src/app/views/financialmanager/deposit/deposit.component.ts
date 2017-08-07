import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectItem } from '../../../../../node_modules/primeng/components/common/api';
import { Finance } from "../finance";
import { FinanceService } from "../finance.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  customs: Finance[];
  custom: Finance = new PrimeCustom();
  selectedCustom: Finance;
  index: number;
  names: SelectItem[];
  newCustom: boolean;
  @ViewChild('collectModal')
  modal1: ModalComponent;
  @ViewChild('returnModal')
  modal2: ModalComponent;
  cssClass = '';
  animation = true;
  keyboard = true;
  backdrop: string | boolean = true;
  css = false;



  constructor(private financeService: FinanceService, http: Http, private router: Router) {
  }
  ngOnInit() {this.getFinance();
    // this.financeService.getFinance().then(customs => this.customs = customs);
  }

  getFinance(){
    this.financeService.getFinance()
                        .subscribe(customs => this.customs = customs);
  }

  collect() {
    this.custom = new PrimeCustom();
    this.modal1.open();
  }

  return() {
    this.custom = new PrimeCustom();
    this.modal2.open();
  }


  save() {
    let customs = [...this.customs];
     // this.custom.time= this.custom.time.Format("yyyy-MM-dd HH:mm:ss"); 
     console.log(this.custom.time);
    customs.push(this.custom);

    this.customs = customs;
    this.modal1.close();
    this.modal2.close();
  }


}


class PrimeCustom implements Finance {

  constructor(public id?, public name?, public telenum?, public depositnow?, public deposittotal?, public credit?, public time?) { }
}


import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { CustomService } from '../custom.service';
import { Custom } from '../custom';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectItem } from '../../../../../node_modules/primeng/components/common/api';


@Component({
  selector: 'app-customc',
  templateUrl: './customc.component.html',
  styleUrls: ['./customc.component.less']
})

export class CustomcComponent implements OnInit {

  customs: Custom[];
  custom: Custom = new PrimeCustom();
  selectedCustom: Custom;
  index: number;
  names: SelectItem[];
  newCustom: boolean;

  @ViewChild('addModal')
  modal: ModalComponent;
  cssClass = '';
  animation = true;
  keyboard = true;
  backdrop: string | boolean = true;
  css = false;



  constructor(private carService: CustomService, http: Http, private router: Router) {
  }



  ngOnInit() {
    this.carService.getCustoms().then(customs => this.customs = customs);
  }
  save() {
    let customs = [...this.customs];
    if (this.newCustom)
      customs.push(this.custom);
    else
      customs[this.index] = this.custom;
    this.customs = customs;
    // this.custom = null;
    this.modal.close();
  }

  edit(data) {
    this.newCustom = false;
    this.custom = this.cloneCustom(data);
    this.modal.open();
    this.index = this.customs.indexOf(data);
  }

  cloneCustom(c: Custom): Custom {
    let custom = new PrimeCustom();
    for (let prop in c) {
      custom[prop] = c[prop];
    }
    return custom;
  }
}


class PrimeCustom implements Custom {

  constructor(public id?, public type?, public name?, public telenum?, public car?, public idnum?, public email?, public address?, public status?) { }
}


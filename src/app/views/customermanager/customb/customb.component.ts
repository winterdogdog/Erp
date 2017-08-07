import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  CustomService
} from '../custom.service';
import {
  Custom
} from '../custom';
import {
  Router
} from '@angular/router';
import {
  Http
} from '@angular/http';
import {
  ModalComponent
} from 'ng2-bs3-modal/ng2-bs3-modal';
import "jquery";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
@Component({
  selector: 'app-customb',
  templateUrl: './customb.component.html',
  styleUrls: ['./customb.component.less']
})
export class CustombComponent implements OnInit {
  customs: Custom[];
  custom: Custom = new PrimeCustom();
  selectedCustom: Custom;
  index: number;
  newCustom: boolean;
  @ViewChild('addModal')
  modal1: ModalComponent;
  @ViewChild('editModal')
  modal2: ModalComponent;
  cssClass: string = '';
  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;
  constructor(private carService: CustomService, http: Http, private router: Router) { }
  ngOnInit() {
    this.carService.getCustoms().then(customs => this.customs = customs);
  }
  //改变顾客状态
  changeState(data) {
    if (data.status === 1) {
      data.status = 0;
    } else {
      data.status = 1;
    }
  }
  // 添加顾客信息
  add() {
    this.newCustom = true;
    this.custom = new PrimeCustom();
    this.modal1.open();
  }
  // 编辑顾客信息
  edit(data) {
    this.newCustom = false;
    this.custom = this.cloneCustom(data);
    this.modal2.open();
    this.index = this.customs.indexOf(data);
  }
  save() {
    let customs = [...this.customs];
    if (this.newCustom) customs.push(this.custom);
    else customs[this.index] = this.custom;
    this.customs = customs;
    this.modal1.close();
    this.modal2.close();
  }
  // 删除信息
  delete() {
    let index = this.index;
    this.customs = this.customs.filter((val, i) => i != index);
    this.modal2.close();
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import { FlotModule } from '../../components/charts/flotChart';
import { CustomcComponent} from './customc/customc.component';
import { CustombComponent} from './customb/customb.component';
import { CustomService} from './custom.service';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';
import {Ng2TableModule} from "ng2-table";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap";
import {HttpRequetInterface} from "../../common/http/app.http.service";
import {TranslateModule} from "@ngx-translate/core";
import {I18nInterface} from "../../common/i18n/app.i18n.service";
import {DatePickerModule} from "ng2-datepicker";
import {AccordionModule} from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ButtonModule} from 'primeng/primeng';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports:
  	[
    DropdownModule,
    Ng2SmartTableModule,
    Ng2Bs3ModalModule,
  	CommonModule,
  	BrowserModule,
  	ChartsModule,
  	DataTableModule,
  	SharedModule,
  	BrowserModule,
  	ChartsModule,
  	FlotModule,
  	IboxtoolsModule,
  	PeityModule,
  	SparklineModule,
    JVectorMapModule,
    Ng2TableModule,
    FormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forRoot(),
    DatePickerModule,
    InputTextModule,
    ChartsModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    ButtonModule],

  declarations:
  	[CustomcComponent,
    CustombComponent],

  providers: [CustomService],

  exports:
  	[CustomcComponent,
    CustombComponent]
})
export class CustomermanagerModule { }

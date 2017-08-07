import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";


// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../components/charts/flotChart';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';
import {RetailerStatisticsComponent} from "./retailer/retailer.statistics.component";
import {RetailerStatistics} from "./retailer/retailer.statistics.service";
import {ProductStatisticsComponent} from "./product/product.statistics.component";
import {ProductStatistics} from "./product/product.statistics.service";
import {Ng2TableModule} from "ng2-table";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap";
import {HttpRequetInterface} from "../../common/http/app.http.service";
import {TranslateModule} from "@ngx-translate/core";
import {I18nInterface} from "../../common/i18n/app.i18n.service";
import {DatePickerModule} from "ng2-datepicker";


@NgModule({
  declarations: [RetailerStatisticsComponent,ProductStatisticsComponent],
  imports     : [
                    BrowserModule,ChartsModule, FlotModule,IboxtoolsModule,PeityModule,SparklineModule,
                    JVectorMapModule,Ng2TableModule,FormsModule,PaginationModule.forRoot(), TranslateModule.forRoot(),
                    DatePickerModule
  ],
  exports     : [RetailerStatisticsComponent,ProductStatisticsComponent],
  providers   : [RetailerStatistics,ProductStatistics,HttpRequetInterface,I18nInterface],
})

export class StatisticsModule {}

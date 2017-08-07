import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

import {CustomermanagerModule} from "./views/customermanager/customermanager.module";

import {FinancialmanagerModule} from './views/financialmanager/financialmanager.module';
//permission


// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import {StatisticsModule} from "./views/statistics/statistics.module";
import {Ng2TableModule} from "ng2-table";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {DatePickerModule} from "ng2-datepicker";


export function HttpLoaderFactory(http:Http){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserAnimationsModule,
    FinancialmanagerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    StatisticsModule,
    CustomermanagerModule,
    LayoutsModule,
    AppviewsModule,
    Ng2TableModule,
    DatePickerModule,
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[Http]
      }
    })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

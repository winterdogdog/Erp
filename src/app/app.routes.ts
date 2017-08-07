import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";



import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";
import {RetailerStatisticsComponent} from "./views/statistics/retailer/retailer.statistics.component";
import {ProductStatisticsComponent} from "./views/statistics/product/product.statistics.component";

import { CustomcComponent } from './views/customermanager/customc/customc.component';
import { CustombComponent } from './views/customermanager/customb/customb.component';

import { DepositComponent } from './views/financialmanager/deposit/deposit.component';
import { DeductComponent} from './views/financialmanager/deduct/deduct.component';

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'starterview', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  //statistics
  {
    path: 'statistics', component: BasicLayoutComponent,
    children: [
      {path: 'retailerStatistics', component: RetailerStatisticsComponent},
      {path: 'productStatistics', component: ProductStatisticsComponent}
    ]
  },
    //customermanager
{
    path: 'customermanager', component: BasicLayoutComponent,
    children: [
      {path: 'customc', component: CustomcComponent},
      {path: 'customb', component: CustombComponent}
    ]
  },

  //financialmanager
  {
    path: 'financialmanager', component: BasicLayoutComponent,
    children: [
      {path: 'deposit', component: DepositComponent},
      {path: 'deduct', component: DeductComponent}
    ]
  },


  // Handle all other routes
  {path: '**',  redirectTo: 'starterview'}
];

import {Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';
import {Router} from '@angular/router';

// Import Chart.js library
import 'chart.js';

import { FlotChartDirective } from '../../../components/charts/flotChart';
import {ProductStatistics} from "./product.statistics.service";
import {ServerConstant} from "../../../common/system/server";
import {StatisticConstant} from "../../../common/statistic/statistic";
import {TranslateService} from "@ngx-translate/core";
import {I18nInterface} from "../../../common/i18n/app.i18n.service";
import {ProductStatisticConstant} from "../../../common/statistic/retailer/product.statistic";
import {DateModel, DatePickerOptions} from "ng2-datepicker";

declare var jQuery:any;

@Component({
  selector: 'productStatistics',
  templateUrl: 'product.statistics.template.html'
})

export class ProductStatisticsComponent implements OnInit{

  //API请求地址
  private serverApiUrl = ServerConstant.SERVER_API_URL;
  //统计时间
  statisticTimeList = StatisticConstant.STATISTIC_TIME_ARR;
  //横坐标
  lineChartLabels = [];
  //选择的时间
  selectedTime:Number;
  //日历
  start: DateModel;
  end: DateModel;
  options: DatePickerOptions;

  constructor(
    private productStatisticsService: ProductStatistics,
    private translate: TranslateService,
    private i18nService:I18nInterface
  ) {
    this.options = new DatePickerOptions();
  }

  // events
  public chartClicked(e:Event):void {

  }

  public chartHovered(e:Event):void {
    console.log();
  }

  //line
  public lineChartType:string = 'line';

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public lineChartOptions = {
    responsive: true
  };

  //product 数据初始化
  productCountData = [{data: [0], label: 'no data'}];

  //sku 数据初始化
  skuCountData = [{data: [0], label: 'no data'}];

  //请求数据
  requestProductSku(url){

    this.productStatisticsService.getData(this.serverApiUrl+url).subscribe(res=> {
      this.productCountData.splice(0,this.productCountData.length);
      //加载product sku 数据
      this.lineChartLabels = res.data.timeList;

      this.translate.get([
        ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.up,
        ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.down,
        ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.on,
        ProductStatisticConstant.STATISTIC_SKU_TYPE.up,
        ProductStatisticConstant.STATISTIC_SKU_TYPE.down,
        ProductStatisticConstant.STATISTIC_SKU_TYPE.on
      ]).subscribe((result: string) => {

        let countOnshelvesfProductList = {
          data: res.data.countOnshelvesfProductList, label: result[ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.up]
        }
        let countOffshelvesfProductList = {
          data: res.data.countOffshelvesfProductList, label: result[ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.down]
        }
        let countshelvesfProductList = {
          data: res.data.countshelvesfProductList, label: result[ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.on]
        }
        this.productCountData.push(countOnshelvesfProductList);
        this.productCountData.push(countOffshelvesfProductList);
        this.productCountData.push(countshelvesfProductList);

        this.skuCountData.splice(0,this.skuCountData.length);
        let countOnShelvesSkuList = {
          data: res.data.countOnShelvesSkuList, label: result[ProductStatisticConstant.STATISTIC_SKU_TYPE.up]
        }
        let countOffShelvesSkuList = {
          data: res.data.countOffShelvesSkuList, label: result[ProductStatisticConstant.STATISTIC_SKU_TYPE.down]
        }
        let countShelvesSkuList = {
          data: res.data.countShelvesSkuList, label: result[ProductStatisticConstant.STATISTIC_SKU_TYPE.on]
        }
        this.skuCountData.push(countOnShelvesSkuList);
        this.skuCountData.push(countOffShelvesSkuList);
        this.skuCountData.push(countShelvesSkuList);
      })

    })
  }

  //初始化
  ngOnInit(){

    let url = "service/statistics/products?time="+StatisticConstant.STATISTIC_TIME_ARR[0].value;
    this.requestProductSku(url);

  }

  //根据时间筛选
  selectTime(time){

    let startTime = this.start !=null?this.start.formatted:'';
    let endTime = this.end !=null?this.end.formatted:'';

    this.selectedTime = time;
    let url = "service/statistics/products?time="+this.selectedTime+"&start="+startTime+"&end="+endTime;
    this.requestProductSku(url);
  }

  //选择开始时间
  onChangeStart(event){

    let startTime = this.start !=null?this.start.formatted:'';
    let endTime = this.end !=null?this.end.formatted:'';
    if(this.selectedTime == null){
      this.selectedTime = 3;
    }

    let url = "service/statistics/products?time="+this.selectedTime+"&start="+startTime+"&end="+endTime;
    this.requestProductSku(url);
  }

  //选择结束时间
  onChangeEnd(event){
    let startTime = this.start !=null?this.start.formatted:'';
    let endTime = this.end !=null?this.end.formatted:'';
    if(this.selectedTime == null){
      this.selectedTime = 3;
    }
    let url = "service/statistics/products?time="+this.selectedTime+"&start="+startTime+"&end="+endTime;
    this.requestProductSku(url);
  }
}

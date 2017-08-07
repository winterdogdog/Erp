"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// Import Chart.js library
require("chart.js");
var server_1 = require("../../../common/system/server");
var statistic_1 = require("../../../common/statistic/statistic");
var product_statistic_1 = require("../../../common/statistic/retailer/product.statistic");
var ng2_datepicker_1 = require("ng2-datepicker");
var ProductStatisticsComponent = (function () {
    function ProductStatisticsComponent(productStatisticsService, translate, i18nService) {
        this.productStatisticsService = productStatisticsService;
        this.translate = translate;
        this.i18nService = i18nService;
        //API请求地址
        this.serverApiUrl = server_1.ServerConstant.SERVER_API_URL;
        //统计时间
        this.statisticTimeList = statistic_1.StatisticConstant.STATISTIC_TIME_ARR;
        //横坐标
        this.lineChartLabels = [];
        //line
        this.lineChartType = 'line';
        this.lineChartOptions = {
            responsive: true
        };
        //product 数据初始化
        this.productCountData = [{ data: [0], label: 'no data' }];
        //sku 数据初始化
        this.skuCountData = [{ data: [0], label: 'no data' }];
        this.options = new ng2_datepicker_1.DatePickerOptions();
    }
    // events
    ProductStatisticsComponent.prototype.chartClicked = function (e) {
    };
    ProductStatisticsComponent.prototype.chartHovered = function (e) {
        console.log();
    };
    ProductStatisticsComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    };
    //请求数据
    ProductStatisticsComponent.prototype.requestProductSku = function (url) {
        var _this = this;
        this.productStatisticsService.getData(this.serverApiUrl + url).subscribe(function (res) {
            _this.productCountData.splice(0, _this.productCountData.length);
            //加载product sku 数据
            _this.lineChartLabels = res.data.timeList;
            _this.translate.get([
                product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.up,
                product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.down,
                product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.on,
                product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.up,
                product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.down,
                product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.on
            ]).subscribe(function (result) {
                var countOnshelvesfProductList = {
                    data: res.data.countOnshelvesfProductList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.up]
                };
                var countOffshelvesfProductList = {
                    data: res.data.countOffshelvesfProductList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.down]
                };
                var countshelvesfProductList = {
                    data: res.data.countshelvesfProductList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_PRODUCT_TYPE.on]
                };
                _this.productCountData.push(countOnshelvesfProductList);
                _this.productCountData.push(countOffshelvesfProductList);
                _this.productCountData.push(countshelvesfProductList);
                _this.skuCountData.splice(0, _this.skuCountData.length);
                var countOnShelvesSkuList = {
                    data: res.data.countOnShelvesSkuList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.up]
                };
                var countOffShelvesSkuList = {
                    data: res.data.countOffShelvesSkuList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.down]
                };
                var countShelvesSkuList = {
                    data: res.data.countShelvesSkuList, label: result[product_statistic_1.ProductStatisticConstant.STATISTIC_SKU_TYPE.on]
                };
                _this.skuCountData.push(countOnShelvesSkuList);
                _this.skuCountData.push(countOffShelvesSkuList);
                _this.skuCountData.push(countShelvesSkuList);
            });
        });
    };
    //初始化
    ProductStatisticsComponent.prototype.ngOnInit = function () {
        var url = "service/statistics/products?time=" + statistic_1.StatisticConstant.STATISTIC_TIME_ARR[0].value;
        this.requestProductSku(url);
    };
    //根据时间筛选
    ProductStatisticsComponent.prototype.selectTime = function (time) {
        console.log(this.start);
        console.log(this.end);
        this.selectedTime = time;
        var url = "service/statistics/products?time=" + this.selectedTime;
        this.requestProductSku(url);
    };
    ProductStatisticsComponent.prototype.onChange = function (event) {
        console.log(event);
    };
    return ProductStatisticsComponent;
}());
ProductStatisticsComponent = __decorate([
    core_1.Component({
        selector: 'productStatistics',
        templateUrl: 'product.statistics.template.html'
    })
], ProductStatisticsComponent);
exports.ProductStatisticsComponent = ProductStatisticsComponent;

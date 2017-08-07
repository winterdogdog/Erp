import {Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';
import {Router} from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';

// Import Chart.js library
import 'chart.js';

import { FlotChartDirective } from '../../../components/charts/flotChart';
import {RetailerStatistics} from './retailer.statistics.service';
import {ServerConstant} from '../../../common/system/server';
import {TranslateService} from '@ngx-translate/core';
import {StatisticConstant} from '../../../common/statistic/statistic';
import {PageConstant} from '../../../common/util/page';
import {RetailerStatisticConstant} from '../../../common/statistic/retailer/retailer.statistic';
import {I18nInterface} from '../../../common/i18n/app.i18n.service';
import {DateModel, DatePickerOptions} from 'ng2-datepicker';

declare var jQuery: any;

//noinspection TsLint
@Component({
  selector: 'retailerStatistics',
  templateUrl: 'retailer.statistics.template.html'
})

export class RetailerStatisticsComponent implements OnInit{

  //API请求地址
  private serverApiUrl = ServerConstant.SERVER_API_URL;
  //初始状态
  retailerStatusList = StatisticConstant.STATISTIC_RETAILER_STATUS__ARR;
  //统计时间
  statisticTimeList = StatisticConstant.STATISTIC_TIME_ARR;
  //统计时间（精确到日）
  statisticTimeDayList = StatisticConstant.STATISTIC_TIME_Day_ARR;
  //类型
  retailerTypeList = StatisticConstant.STATISTIC_RETAILER_TYPE__ARR;
  //B端横坐标
  lineChartLabels;
  //C端横坐标
  clineChartLabels;

  //选择的状态
  selectedStatus: Number;
  //选择的时间
  selectedTime: Number;
  //选择类型
  selectedType: Number;
  //C端选择的时间
  cselectedTime: Number;
  //retailer chart选择时间
  startRetailerDate: DateModel;
  endRetailerDate: DateModel;
  //customer chart选择时间
  startCustomerDate: DateModel;
  endCustomerDate: DateModel;
  //customer table 选择时间
  startCustomerTblDate: DateModel;
  endCustomerTblDate: DateModel;
  options: DatePickerOptions;

  // lineChart
  public lineChartType: String = 'line';

  public lineChartOptions = {
    responsive: true
  };

  //B端 retailer 数据初始化
  retailerCountData: Array<any> = [{data: [0], label: 'no data'}];
  //C端数据初始化
  customerCountData: Array<any> = [{data: [0], label: 'no data'}];

  //选择的tab B端/C端
  active: Number;

  //table
  public rows: Array<any> = [];
  public columns: Array<any> = [

    {title: 'Customer ID', className: ['office-header', 'text-success'], name: 'customerID', sort: ''},
    {title: 'Customer Name', className: ['office-header', 'text-success'], name: 'customerName', sort: ''},
    {title: 'Mobile', className: ['office-header', 'text-success'], name: 'mobile', sort: ''},
    {title: 'Email', className: ['office-header', 'text-success'], name: 'email', sort: ''},
    {title: 'Comments', className: ['office-header', 'text-success'], name: 'comments', sort: ''},
    {title: 'Retailer ID', className: ['office-header', 'text-success'], name: 'retailerID', sort: ''},
    {title: 'Create Date', className: ['office-header', 'text-success'], name: 'createDate', sort: ''}
  ];

  //初始化page
  public page: number = PageConstant.INITPAGE;
  public itemsPerPage: number = PageConstant.PAGESIZE;
  public maxSize: number = PageConstant.INITMAXSIZE;
  public numPages: number = PageConstant.INITNUMPAGES;
  public length: number = PageConstant.INITLENGTH;
  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  private data: Array<any>  = [];

  // chart 点击事件 events
  public chartClicked(e: Event): void {
    console.log('clicked chart event2');
  }

  //悬浮事件
  public chartHovered(e: Event): void {
    console.log('Hovered event');
  }

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public constructor(
    private retailerStatisticsService: RetailerStatistics,
    private translate: TranslateService,
    private i18nService: I18nInterface
  ) {
    this.options = new DatePickerOptions();
      // //添加语言支持
      // translate.addLangs(['zh-CN', 'en']);
      // //设置默认语言，一般在无法匹配的时候使用
      // translate.setDefaultLang('zh-CN');
      //
      // //获取当前浏览器环境的语言比如en、 zh
      // let broswerLang = translate.getBrowserLang();
      // translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
  }

  changeLang(lang) {
    console.log(lang);
    this.translate.use(lang);
  }
  toggleLang() {
    console.log(this.translate.getBrowserLang());
    // 获取语言风格，相当于更详细的语言类型，比如zh-CN、zh-TW、en-US
    console.log(this.translate.getBrowserCultureLang());
  }

  //加载retailer数据
  loadRetailer(result) {

    this.translate.get([
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.new,
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.all,
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.active,
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.silent,
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.zombie,
                          RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.valid
      ]).subscribe((res: string) => {

        this.lineChartLabels = result.timeList;
        const retailerNew = {
          data: result.countNewRetailerList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.new]
        };
        const retailerAll = {
          data: result.countAllRetailerList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.all]
        };
        const retailerActive = {
          data: result.countActiveRretailersList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.active]
        };
        const retailerSilent = {
          data: result.countSilentRretailersList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.silent]
        };
        const retailerZombie = {
          data: result.countZombieRretailersList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.zombie]
        };
        const retailerValid = {
          data: result.countValidRretailersList, label: res[RetailerStatisticConstant.STATISTIC_RETAILER_TYPE.valid]
        };
        this.retailerCountData.push(retailerNew);
        this.retailerCountData.push(retailerAll);
        this.retailerCountData.push(retailerActive);
        this.retailerCountData.push(retailerSilent);
        this.retailerCountData.push(retailerZombie);
        this.retailerCountData.push(retailerValid);
   });


  }

  //加载C端retailer
  loadCRetailer(result) {

    this.translate.get([
      RetailerStatisticConstant.STATISTIC_CUSTOMER_TYPE.new,
      RetailerStatisticConstant.STATISTIC_CUSTOMER_TYPE.all
    ]).subscribe((res: string) => {

      this.clineChartLabels = result.timeList;
      const retailerNew = {
        data: result.countNewRetailerList, label: res[RetailerStatisticConstant.STATISTIC_CUSTOMER_TYPE.new]
      };
      const retailerAll = {
        data: result.countAllRetailerList, label: res[RetailerStatisticConstant.STATISTIC_CUSTOMER_TYPE.all]
      };
      this.customerCountData.push(retailerNew);
      this.customerCountData.push(retailerAll);
    });

  }

  /**
   * @description 初始化tab
   *  1.B端 2.C端
   */
  initSelectTab() {
    this.active = 1;
  }

  // 請求B端图表数据
  requestRetailerData(url: String) {
    this.retailerStatisticsService.getData(this.serverApiUrl + url).subscribe(res => {
      this.retailerCountData.splice(0, this.retailerCountData.length);
      // 加载retailer数据
      this.loadRetailer(res.data);
    });
  }

  //請求C端图表数据
  requestCustomerData(url: String) {
    this.retailerStatisticsService.getData(this.serverApiUrl + url).subscribe( res => {
      this.customerCountData.splice(0, this.customerCountData.length);
      // 加载retailer数据
      this.loadCRetailer(res.data);
    });
  }

  //初始化
  ngOnInit() {

    // tab选择
    this.initSelectTab();
    // retailer图表
    const retilerLineCharUrl = 'service/statistics/retailers?time=3';
    this.requestRetailerData(retilerLineCharUrl);

    // C端图表
    const customerLineCharUrl = 'service/statistics/c/retailers?time=4';
    this.requestCustomerData(customerLineCharUrl);

    // 获取C端table信息
    this.onChangeTable(this.config);

    // test
    const customerTestUrl = 'service/statistics/c/test';
    this.retailerStatisticsService.postData(this.serverApiUrl + customerTestUrl, { 'name': 'zhangsan'}).subscribe( res => {
      console.log(res.data);
    });
  }

  //选择tab
  selectTab(index) {
    this.active = index;
  }

  //根据状态筛选
  selectStatus(status) {
    this.selectedStatus = status;
    const start = this.startRetailerDate != null ? this.startRetailerDate.formatted : '';
    const end = this.endRetailerDate != null ? this.endRetailerDate.formatted : '';
    let url = 'service/statistics/retailers?status=' + this.selectedStatus;
    if (this.selectedTime != null) {
      url += '&time=' + this.selectedTime;
    }
    if (this.selectedType != null) {
      url += '&type=' + this.selectedType;
    }
    if (start != null) {
      url += '&start=' + start;
    }
    if (end != null) {
      url += '&end=' + end;
    }
    this.requestRetailerData(url);
  }

  //根据时间筛选
  selectTime(time) {
    // 选择的时间
    this.selectedTime = time;
    const start = this.startRetailerDate != null ? this.startRetailerDate.formatted : '';
    const end = this.endRetailerDate != null ? this.endRetailerDate.formatted : '';
    let url = 'service/statistics/retailers?time=' + this.selectedTime;
    if (this.selectedStatus != null) {
      url += '&status=' + this.selectedStatus;
    }
    if (this.selectedType != null) {
      url += '&type=' + this.selectedType;
    }
    if (start != null) {
      url += '&start=' + start;
    }
    if (end != null) {
      url += '&end=' + end;
    }
    this.requestRetailerData(url);
  }

  //根据类型筛选
  selectType(type) {
    this.selectedType = type;
    const start = this.startRetailerDate != null ? this.startRetailerDate.formatted : '';
    const end = this.endRetailerDate != null ? this.endRetailerDate.formatted : '';
    let url = 'service/statistics/retailers?type=' + this.selectedType;
    if (this.selectedStatus != null) {
      url += '&status=' + this.selectedStatus;
    }
    if (this.selectedTime != null) {
      url += '&time=' + this.selectedTime;
    }
    if (start != null) {
      url += '&start=' + start;
    }
    if (end != null) {
      url += '&end=' + end;
    }
    this.requestRetailerData(url);
  }

  //选择retailer开始时间
  onChangeRetailerStartDate(event) {
    const start = this.startRetailerDate != null ? this.startRetailerDate.formatted : '';
    const end = this.endRetailerDate != null ? this.endRetailerDate.formatted : '';

    let url = 'service/statistics/retailers?start=' + start + '&end=' + end;
    if (this.selectedStatus != null) {
      url += '&status=' + this.selectedStatus;
    }
    if (this.selectedTime != null) {
      url += '&time=' + this.selectedTime;
    }
    if (this.selectedType != null) {
      url += '&type=' + this.selectedType;
    }
    this.requestRetailerData(url);
  }

  //选择retailer结束时间
  onChangeRetailerEndDate(event) {
    const start = this.startRetailerDate != null ? this.startRetailerDate.formatted : '';
    const end = this.endRetailerDate != null ? this.endRetailerDate.formatted : '';

    let url = 'service/statistics/retailers?start=' + start + '&end=' + end;
    if (this.selectedStatus != null) {
      url += '&status=' + this.selectedStatus;
    }
    if (this.selectedTime != null) {
      url += '&time=' + this.selectedTime;
    }
    if (this.selectedType != null) {
      url += '&type=' + this.selectedType;
    }
    this.requestRetailerData(url);
  }

  //根据时间筛选C端用户
  selectCTime(time) {

    this.cselectedTime = time;
    let url = 'service/statistics/c/retailers?time=' + this.cselectedTime;
    const start = this.startCustomerDate != null ? this.startCustomerDate.formatted : '';
    const end = this.endCustomerDate != null ? this.endCustomerDate.formatted : '';

    if (start != null && start !== '') {
      url += '&start=' + start;
    }
    if (end != null && end !== '') {
      url += '&end=' + end;
    }
    this.requestCustomerData(url);
  }

  //选择customer开始时间
  onChangeCustomerStartDate(event) {
    const start = this.startCustomerDate != null ? this.startCustomerDate.formatted : '';
    const end = this.endCustomerDate != null ? this.endCustomerDate.formatted : '';
    let url = 'service/statistics/c/retailers?time=' + (this.cselectedTime == null ? 4 : this.cselectedTime);
    if (start != null && start !== '') {
      url += '&start=' + start;
    }
    if (end != null && end !== '') {
      url += '&end=' + end;
    }
    this.requestCustomerData(url);
  }

  //选择customer结束时间
  onChangeCustomerEndDate(event) {
    const start = this.startCustomerDate != null ? this.startCustomerDate.formatted : '';
    const end = this.endCustomerDate != null ? this.endCustomerDate.formatted : '';
    let url = 'service/statistics/c/retailers?time=' + (this.cselectedTime == null ? 4 : this.cselectedTime);
    if (start != null && start !== '') {
      url += '&start=' + start;
    }
    if (end != null && end !== '') {
      url += '&end=' + end;
    }
    this.requestCustomerData(url);
  }

  //table event
  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : this.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  /**
   * 分页
   * @param config
   * @param page
   */
  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let sortCol = '';
    let sortVal = '';
    for (let i = 0; i < this.config.sorting.columns.length; i++) {
      if (this.config.sorting.columns[i]['sort'] != null && this.config.sorting.columns[i]['sort'] !== '') {
        sortCol = this.config.sorting.columns[i]['name'];
        sortVal = this.config.sorting.columns[i]['sort'];
      }
    }

    const offset = (page.page - 1 ) * this.itemsPerPage;
    const url = this.serverApiUrl + 'service/customer/?offset=' + offset + '&sortCol=' + sortCol + '&sortVal=' + sortVal;
    this.retailerStatisticsService.getData(url).subscribe(result => {
      const data = result.data;
      this.length = data.count;
      this.data = data.data;

      this.maxSize = data.count;
      this.rows = data.data;
    });
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  /**
   * 搜索C端用户
   */
  public searchCRetailer() {

    let searchKey = '';
    if (this.config.filtering.filterString == null) {
      searchKey = '';
    }else {
      searchKey = this.config.filtering.filterString;
    }
    let url = this.serverApiUrl + 'service/customer/?keyword=' + searchKey;
    const start =  this.startCustomerTblDate != null ? this.startCustomerTblDate.formatted : '';
    const end =  this.endCustomerTblDate != null ? this.endCustomerTblDate.formatted : '';
    if (start != null && start !== '') {
      url += '&start=' + start;
    }
    if (end != null && end !== '') {
      url += '&end=' + end;
    }

    this.retailerStatisticsService.getData(url).subscribe(result => {
      const data = result.data;
      this.length = data.count;
      this.data = data.data;

      this.maxSize = data.count;
      this.rows = data.data;
    });
  }

}

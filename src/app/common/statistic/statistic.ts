/**
 * Created by 小亮 on 2017/6/10.
 */

export class StatisticConstant{

  /**
   * 统计时间
   * 1.每年 2 每月 3.每周
   * @type {[{name: string; value: string}]}
   */
  public static readonly STATISTIC_TIME_ARR = [
    {"name":'statistic_time_week', 'value':3},
    {"name":'statistic_time_month', 'value':2},
    {"name":'statistic_time_year', 'value':1},
  ]

  /**
   * 统计时间
   * 1.每年 2 每月 3.每周 4日
   * @type {[{name: string; value: string}]}
   */
  public static readonly STATISTIC_TIME_Day_ARR = [
    {"name":'statistic_time_day', 'value':4},
    {"name":'statistic_time_week', 'value':3},
    {"name":'statistic_time_month', 'value':2},
    {"name":'statistic_time_year', 'value':1},
  ]

  /**
   * 审核状态
   * 0 未审核  1 已审核
   * @type {[{name: string; value: string}]}
   */
  public static readonly STATISTIC_RETAILER_STATUS__ARR = [
    {"name":'statistic_retailer_status_all', 'value':''},
    {"name":'statistic_retailer_status_checked', 'value':1},
    {"name":'statistic_retailer_status_unchecked', 'value':0},
  ]

  /**
   *  客户类型
   * 0 小B  8 加盟商 10 微零售
   * @type {[{name: string; value: string}]}
   */
  public static readonly STATISTIC_RETAILER_TYPE__ARR = [
    {"name":'statistic_retailer_type_all', 'value':''},
    {"name":'statistic_retailer_type_retailer', 'value':0},
    {"name":'statistic_retailer_type_franchisee', 'value':8},
    {"name":'statistic_retailer_type_microRetail', 'value':10}
  ]

}

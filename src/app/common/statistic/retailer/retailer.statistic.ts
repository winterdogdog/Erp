/**
 * Created by 小亮 on 2017/6/10.
 */

export class RetailerStatisticConstant{

  /**
   * 统计的retailer类型
   * @type {{new: string; all: string; active: string; silent: string; zombie: string; valid: string}}
   *  new:新增用户
   *  all:累积用户
   *  active:活跃用户
   *  silent:沉默用户
   *  zombie:僵尸用户
   *  valid:有效用户
   */
  public static readonly STATISTIC_RETAILER_TYPE = {
    'new': 'statistic_retailer_new',
    'all': 'statistic_retailer_all',
    'active': 'statistic_retailer_active',
    'silent': 'statistic_retailer_silent',
    'zombie': 'statistic_retailer_zombie',
    'valid': 'statistic_retailer_valid'
  }

  /**
   * 统计的customer类型
   * @type {{new: string; all: string}}
   *  new:新增用户
   *  all:累积用户
   */
  public static readonly STATISTIC_CUSTOMER_TYPE = {
    "new":"statistic_customer_new",
    "all":"statistic_customer_all"
  }

}

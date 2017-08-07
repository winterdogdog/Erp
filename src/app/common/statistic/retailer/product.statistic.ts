/**
 * Created by 小亮 on 2017/6/10.
 */

export class ProductStatisticConstant{

  /**
   * 统计的product
   * @type {{up: string; down: string; on: string}}
   */
  public static readonly STATISTIC_PRODUCT_TYPE = {
    "up":"statistic_product_up",
    "down":"statistic_product_down",
    "on":"statistic_product_on",
  }

  /**
   * 统计的sku
   * @type {{up: string; down: string; on: string}}
   */
  public static readonly STATISTIC_SKU_TYPE = {
    "up":"statistic_sku_up",
    "down":"statistic_sku_down",
    "on":"statistic_sku_on",
  }

}

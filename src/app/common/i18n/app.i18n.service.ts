import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ServerConstant} from "../system/server";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class I18nInterface {

  constructor(private translate: TranslateService) {
    //添加语言支持
    translate.addLangs(['zh-CN', 'en']);
    //设置默认语言，一般在无法匹配的时候使用
    translate.setDefaultLang('zh-CN');

    //获取当前浏览器环境的语言比如en、 zh
    let broswerLang = translate.getBrowserLang();
    translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
  }
}

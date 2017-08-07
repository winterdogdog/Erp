"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var I18nInterface = (function () {
    function I18nInterface(translate) {
        this.translate = translate;
        //添加语言支持
        translate.addLangs(['zh-CN', 'en']);
        //设置默认语言，一般在无法匹配的时候使用
        translate.setDefaultLang('zh-CN');
        //获取当前浏览器环境的语言比如en、 zh
        var broswerLang = translate.getBrowserLang();
        translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
    }
    return I18nInterface;
}());
I18nInterface = __decorate([
    core_1.Injectable()
], I18nInterface);
exports.I18nInterface = I18nInterface;

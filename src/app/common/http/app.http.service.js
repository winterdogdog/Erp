"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var server_1 = require("../system/server");
var HttpRequetInterface = (function () {
    function HttpRequetInterface(http) {
        this.http = http;
    }
    HttpRequetInterface.prototype.createAuthorizationHeader = function (headers) {
        headers.append(server_1.ServerConstant.Authorization, server_1.ServerConstant.AuthorizationValue);
    };
    HttpRequetInterface.prototype.getData = function (url) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    };
    return HttpRequetInterface;
}());
HttpRequetInterface = __decorate([
    core_1.Injectable()
], HttpRequetInterface);
exports.HttpRequetInterface = HttpRequetInterface;

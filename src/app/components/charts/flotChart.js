"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// Import Chart.js library
require("./../../../../vendor/flot/jquery.flot.js");
require("./../../../../vendor/flot/jquery.flot.tooltip.min.js");
require("./../../../../vendor/flot/jquery.flot.spline.js");
require("./../../../../vendor/flot/jquery.flot.time.js");
var FlotChartDirective = (function () {
    function FlotChartDirective(element) {
        this.initFlag = false;
        this.element = element;
    }
    // Initialise
    FlotChartDirective.prototype.ngOnInit = function () {
        this.initFlag = true;
        if (this.options || this.dataset) {
            this.build();
        }
    };
    // Build
    FlotChartDirective.prototype.build = function () {
        // Clear before rebuild
        this.ngOnDestroy();
        // Check if Flot is available
        if (typeof jQuery.plot === 'undefined') {
            throw new Error('Configuration issue: Embedding jquery.flot.js lib is mandatory');
        }
        // Let's build chart
        this.chart = jQuery.plot(this.element.nativeElement, this.dataset, this.options);
    };
    // Change
    FlotChartDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            // Check if the changes are in the datasets
            if (changes.hasOwnProperty('dataset')) {
                this.updateChartData(changes['dataset'].currentValue);
            }
            else {
                // Otherwise rebuild the chart
                this.build();
            }
        }
    };
    // Update
    FlotChartDirective.prototype.updateChartData = function (newDataValues) {
        this.chart.setData(newDataValues);
        this.chart.setupGrid();
        this.chart.draw();
    };
    // Destroy
    FlotChartDirective.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.shutdown();
            this.chart = void 0;
        }
    };
    // Resize
    FlotChartDirective.prototype.onResize = function () {
        this.chart.resize();
        this.chart.setupGrid();
        this.chart.draw();
    };
    return FlotChartDirective;
}());
__decorate([
    core_1.Input()
], FlotChartDirective.prototype, "options", void 0);
__decorate([
    core_1.Input()
], FlotChartDirective.prototype, "dataset", void 0);
FlotChartDirective = __decorate([
    core_1.Directive({
        selector: 'div[flotChart]',
        exportAs: 'flot-chart',
        host: {
            '(window:resize)': 'onResize()'
        }
    })
], FlotChartDirective);
exports.FlotChartDirective = FlotChartDirective;
var FlotModule = (function () {
    function FlotModule() {
    }
    return FlotModule;
}());
FlotModule = __decorate([
    core_1.NgModule({
        declarations: [
            FlotChartDirective
        ],
        exports: [
            FlotChartDirective
        ],
        imports: []
    })
], FlotModule);
exports.FlotModule = FlotModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SummaryComponent = (function () {
    function SummaryComponent() {
    }
    return SummaryComponent;
}());
SummaryComponent = __decorate([
    core_1.Component({
        selector: 'summary-component',
        template: "<div class=\"alert alert-info\">\n    <h1>Cloud and Data Solution Quote Preview</h1>\n    <b>Cloud Provider:</b>{{summary.cloudProvider}}<br />\n    <b>Hosting at location:</b>{{summary.country}}<br />\n    <div *ngIf=\"summary.hasDataIngestion\">\n        <h2>Data Ingestion</h2>\n        <b>ETL:</b>{{summary.etl}}<br />\n        <b *ngIf=\"summary.requiresLicence\">Requires Licence:</b>Yes<br />\n        <b *ngIf=\"!summary.requiresLicence\">AIP Licence:</b>{{summary.aipLicenceNumber}}<br />\n    </div>\n    <div *ngIf=\"summary.hasDataVisualization\">\n        <h2>Data Visualization</h2>\n        <b>Tool:</b>{{summary.visualizationTool}}<br />\n        <b>Users:</b>{{summary.visualizationUsers}}<br />\n        <b>Designers:</b>{{summary.visualizationDesigners}}<br />\n    </div>\n    <h2>Quoted Price: {{summary.price | currency:'USD':true}}</h2>\n    </div>",
        inputs: ['summary']
    })
], SummaryComponent);
exports.SummaryComponent = SummaryComponent;
//# sourceMappingURL=summary.component.js.map
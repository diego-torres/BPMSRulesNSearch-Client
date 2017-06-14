"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var summary_model_1 = require("./summary.model");
var cloud_providers_service_1 = require("./cloud-providers.service");
var AppComponent = (function () {
    function AppComponent(_formBuilder, _cloudProviderService) {
        this._formBuilder = _formBuilder;
        this._cloudProviderService = _cloudProviderService;
        this.currentSection = 'set1';
        this.countries = [];
        this.cloudProviders = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cloudServiceForm = this._formBuilder.group({
            provider: ['NONE'],
            countryLocation: ['NONE'],
            hasDataIngestion: [],
            hasDataVisualization: [],
            dataIngestion: this._formBuilder.group({
                requiresLicense: [],
                aipLicenseNumber: [],
                willPerformDataQuality: [],
                preferredETL: [],
                developersUsingAlteryx: [0]
            }),
            dataVisualization: this._formBuilder.group({
                requiresLicense: [],
                aipLicenseNumber: [],
                endUsersQuantity: [0],
                reportingDevelopersQuantity: [0],
                preferredVisualization: []
            })
        });
        this._cloudProviderService.getProviders().subscribe(function (resCloudProviders) { return _this.countries = resCloudProviders; });
    };
    AppComponent.prototype.onCountryChange = function (value) {
        this.cloudProviders = this.countries.filter(function (c) { return c.country === value; }).pop().cloudProviders;
    };
    AppComponent.prototype.onNextOne = function () {
        // TODO: Submit if no other selection
        // TODO: Execute advise rules.
        this.adviseOne = true;
        this.adviseOneContent = 'We recommend the use of AIP SaaS Model + Informatica DQ tool.';
        this.currentSection = 'set2';
    };
    AppComponent.prototype.onPreviousTwo = function () {
        this.currentSection = 'set1';
    };
    AppComponent.prototype.onNextTwo = function () {
        this.currentSection = 'set3';
    };
    AppComponent.prototype.onFinish = function () {
        // TODO: Evaluate Price and start process.
        this.summary = new summary_model_1.Summary();
        this.summary.cloudProvider = this.cloudServiceForm.value['provider'];
        this.summary.country = this.cloudServiceForm.value['countryLocation'];
        this.summary.hasDataIngestion = this.cloudServiceForm.value['hasDataIngestion'];
        this.summary.hasDataVisualization = this.cloudServiceForm.value['hasDataVisualization'];
        this.summary.price = 3550.45;
        this.currentSection = 'confirm';
    };
    AppComponent.prototype.onStartOver = function () {
        // TODO: Rollback request (signal to cancel)
        this.currentSection = 'set1';
    };
    AppComponent.prototype.onSubmit = function () {
        // TODO: Signal to continue
        this.currentSection = 'summary';
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        providers: [cloud_providers_service_1.CloudProvidersService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, cloud_providers_service_1.CloudProvidersService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
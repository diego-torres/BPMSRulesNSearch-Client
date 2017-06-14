import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Summary } from './summary.model';
import { CloudProvidersService } from './cloud-providers.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [CloudProvidersService]
})
export class AppComponent implements OnInit {
  adviseOne: boolean;
  adviseOneContent: string;
  currentSection = 'set1';
  cloudServiceForm: FormGroup;
  countries = [];
  cloudProviders = [];
  summary: Summary;

  constructor(private _formBuilder: FormBuilder, private _cloudProviderService: CloudProvidersService) { }

  ngOnInit() {
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
    this._cloudProviderService.getProviders().subscribe(resCloudProviders => this.countries = resCloudProviders);
  }

  onCountryChange(value: string): void {
    this.cloudProviders = this.countries.filter(c => c.country === value).pop().cloudProviders;
  }

  onNextOne() {
    // TODO: Submit if no other selection
    // TODO: Execute advise rules.
    this.adviseOne = true;
    this.adviseOneContent = 'We recommend the use of AIP SaaS Model + Informatica DQ tool.';
    this.currentSection = 'set2';
  }

  onPreviousTwo() {
    this.currentSection = 'set1';
  }

  onNextTwo() {
    this.currentSection = 'set3';
  }

  onFinish() {
    // TODO: Evaluate Price and start process.
    this.summary = new Summary();
    this.summary.cloudProvider = this.cloudServiceForm.value['provider'];
    this.summary.country = this.cloudServiceForm.value['countryLocation'];
    this.summary.hasDataIngestion = this.cloudServiceForm.value['hasDataIngestion'];
    this.summary.hasDataVisualization = this.cloudServiceForm.value['hasDataVisualization'];
    this.summary.price = 3550.45;

    this.currentSection = 'confirm';
  }

  onStartOver() {
    // TODO: Rollback request (signal to cancel)
    this.currentSection='set1';
  }

  onSubmit() {
    // TODO: Signal to continue
    this.currentSection = 'summary';
  }

}

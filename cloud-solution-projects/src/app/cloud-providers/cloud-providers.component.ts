import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CloudProvidersService } from './cloud-providers.service';

@Component({
    selector: 'cloud-providers',
    templateUrl: 'app/cloud-providers/cloud-providers.html',
    providers: [CloudProvidersService]
})
export class CloudProvidersComponent implements OnInit {
    cloudProviderForm: FormGroup;
    countries = [];
    cloudProviders = [];

    constructor(private _fb: FormBuilder, private _cloudProviderService: CloudProvidersService) { }

    ngOnInit() {
        this.cloudProviderForm = this._fb.group({
            provider: ['NONE'],
            countryLocation: ['NONE'],
            hasDataIngestion: [],
            hasDataVisualization: []
        });
        this._cloudProviderService.getProviders().subscribe(resCloudProviders => this.countries = resCloudProviders);
    }

    onCountryChange(value: string): void {
        this.cloudProviders = this.countries.filter(c => c.country === value).pop().cloudProviders;
    }
}
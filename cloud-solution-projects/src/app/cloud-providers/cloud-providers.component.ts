import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { CloudProvidersService } from './cloud-providers.service';
import { ProjectService } from '../project/project.service';

@Component({
    selector: 'cloud-providers',
    templateUrl: 'cloud-providers.html',
    providers: [CloudProvidersService, ProjectService]
})
export class CloudProvidersComponent implements OnInit {
    cloudProviderForm: FormGroup;
    countries = [];
    cloudProviders = [];
    project: any = { "title": "" };

    constructor(
        private _fb: FormBuilder,
        private _cloudProviderService: CloudProvidersService,
        private _projectService: ProjectService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.cloudProviderForm = this._fb.group({
            provider: ['NONE'],
            countryLocation: ['NONE'],
            hasDataIngestion: [],
            hasDataVisualization: []
        });
        this._cloudProviderService.getProviders().subscribe(resCloudProviders => this.countries = resCloudProviders);
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.getProcessVariables(projectId).subscribe(result => { this.project = result.project; });
    }

    onCountryChange(value: string): void {
        this.cloudProviders = this.countries.filter(c => c.country === value).pop().cloudProviders;
    }

    onSubmit() {
        let projectId = this._route.snapshot.paramMap.get('id');
        let hasDataIngestion = this.cloudProviderForm.controls['hasDataIngestion'].value;
        let hasDataVisualization = this.cloudProviderForm.controls['hasDataVisualization'].value;
        let cloudSolution = {
            "projectId": projectId,
            "cloudProvider": this.cloudProviderForm.controls['provider'].value,
            "locationCountry": this.cloudProviderForm.controls['countryLocation'].value,
            "hasDataIngestion": hasDataIngestion === null ? false : hasDataIngestion,
            "hasDataVisualization": hasDataVisualization === null ? false : hasDataVisualization,
        };
        this.project.cloudSolution = cloudSolution;
        this.project.cloudSolution.project = { "id": projectId };
        this.project.dataIngestion = null;
        this.project.dataVisualization = null;
        this._projectService.signal(this.project, projectId, "additionalInfo").subscribe(response => {
            this._projectService.getProcessVariables(projectId)
                .subscribe(response => {
                    let viewName: string;
                    viewName = response.project.viewRecommendation.viewName;
                    if (viewName)
                        this._router.navigate([viewName]);
                    else
                        this._router.navigate(['projects/' + projectId + '/cloud']);
                });
        }, err => {
            console.log(err);
            this._router.navigate(['projects/' + projectId + '/cloud']);
        });
    }

    onProjectsList() {
        this._router.navigate(['projects']);
    }
}
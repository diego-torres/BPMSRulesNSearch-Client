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
    project: any = { "org.acme.cloud_solution_projects.Project": { "Title": "" } };

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
        let cloudSolution = {
            "projectId": projectId,
            "cloudProvider": this.cloudProviderForm.controls['provider'].value,
            "locationCountry": this.cloudProviderForm.controls['countryLocation'].value,
            "hasDataIngestion": this.cloudProviderForm.controls['hasDataIngestion'].value,
            "hasDataVisualization": this.cloudProviderForm.controls['hasDataVisualization'].value
        };
        this.project['org.acme.cloud_solution_projects.Project'].cloudSolution = cloudSolution;
        this.project['org.acme.cloud_solution_projects.Project'].dataIngestion = null;
        console.log(this.project);
        this._projectService.signal(this.project, "additionalInfo").subscribe(response => {
            this._projectService.getProcessVariables(projectId)
                .subscribe(response => {
                    console.log('process variables: ' + response);
                    let viewName: string;
                    viewName = response.project['org.acme.cloud_solution_projects.Project'].viewRecommendation['org.acme.cloud_solution_projects.ViewRecommendation'].viewName;
                    if(viewName)
                        this._router.navigate([viewName]);
                    else
                        this._router.navigate(['projects/' + projectId + '/cloud']);            
                });
        }, err => {
            console.log(err);
            this._router.navigate(['projects/' + projectId + '/cloud']);
        });
    }
}
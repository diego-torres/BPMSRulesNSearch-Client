import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../project/project.service';

@Component({
    selector: 'data-ingestion',
    templateUrl: 'data-ingestion.html',
    providers: [ProjectService]
})
export class DataIngestionComponent implements OnInit {
    dataIngestionForm: FormGroup;
    project: any = { "Title": "" };

    constructor(
        private _fb: FormBuilder,
        private _projectService: ProjectService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.dataIngestionForm = this._fb.group({
            requiresLicense: [false],
            licenseNumber: [],
            requiresDataQuality: [false],
            etlTool: ['AIP'],
            developersQuantity: [0]
        });
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.getProcessVariables(projectId).subscribe(result => {
            this.project = result.project;
        });
    }

    onSubmit() {
        let projectId = this._route.snapshot.paramMap.get('id');
        let dataIngestion = {
            "projectId": projectId,
            "requiresLicense": this.dataIngestionForm.controls['requiresLicense'].value === null ? false : this.dataIngestionForm.controls['requiresLicense'].value,
            "licenseNumber": this.dataIngestionForm.controls['licenseNumber'].value,
            "etlToolPreference": this.dataIngestionForm.controls['etlTool'].value,
            "developersQuantity": this.dataIngestionForm.controls['developersQuantity'].value
        };
        //this.project['org.acme.cloud_solution_projects.Project'].cloudSolution = this.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'];
        this.project.dataIngestion = dataIngestion;
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

    onCloudSolution() {
        let projectId = this._route.snapshot.paramMap.get('id');
        this._router.navigate(['projects/' + projectId + '/cloud']);
    }
}
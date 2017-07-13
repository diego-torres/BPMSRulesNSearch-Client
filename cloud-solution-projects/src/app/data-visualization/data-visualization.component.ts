import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../project/project.service';

@Component({
    selector: 'data-visualization',
    templateUrl: 'data-visualization.html',
    providers: [ProjectService]
})
export class DataVisualizationComponent implements OnInit {
    dataVisualizationForm: FormGroup;
    project: any = { "org.acme.cloud_solution_projects.Project": { "Title": "" } };

    constructor(
        private _fb: FormBuilder,
        private _projectService: ProjectService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.dataVisualizationForm = this._fb.group({
            requiresLicense: [false],
            licenseNumber: [],
            endUsersQuantity: [0],
            developersQuantity: [0],
            visualizationTool: []
        });
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.getProcessVariables(projectId).subscribe(result => {
            this.project = result.project;
            console.log('Project at dataIngestion: ' + this.project);
        });
    }

    onSubmit() {
        let projectId = this._route.snapshot.paramMap.get('id');
        let dataVisualization = {
            "projectId": projectId,
            "requiresLicense": this.dataVisualizationForm.controls['requiresLicense'].value,
            "licenseNumber": this.dataVisualizationForm.controls['licenseNumber'].value,
            "endUsersQuantity": this.dataVisualizationForm.controls['endUsersQuantity'].value,
            "developersQuantity": this.dataVisualizationForm.controls['developersQuantity'].value,
            "preferredVisualizationTool": this.dataVisualizationForm.controls['visualizationTool'].value
        };
        this.project['org.acme.cloud_solution_projects.Project'].cloudSolution = this.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'];
        
        if(this.project['org.acme.cloud_solution_projects.Project'].dataIngestion)
            this.project['org.acme.cloud_solution_projects.Project'].dataIngestion = this.project['org.acme.cloud_solution_projects.Project'].dataIngestion['org.acme.cloud_solution_projects.DataIngestion'];
        
        this.project['org.acme.cloud_solution_projects.Project'].dataVisualization = dataVisualization;
        console.log(this.project);
        this._projectService.signal(this.project, projectId, "additionalInfo").subscribe(response => {
            this._projectService.getProcessVariables(projectId)
                .subscribe(response => {
                    console.log('process variables: ' + response);
                    let viewName: string;
                    viewName = response.project['org.acme.cloud_solution_projects.Project'].viewRecommendation['org.acme.cloud_solution_projects.ViewRecommendation'].viewName;
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
}
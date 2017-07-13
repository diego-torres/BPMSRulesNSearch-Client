import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ProjectService } from '../project/project.service';

@Component({
    selector: 'summary-component',
    templateUrl: 'summary.html'
})
export class SummaryComponent implements OnInit {
    project: any = { "org.acme.cloud_solution_projects.Project": { "Title": "" } };
    cloudSolution: any = {};
    dataIngestion: any = {};
    dataVisualization: any = {};

    constructor(
        private _projectService: ProjectService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.getProcessVariables(projectId).subscribe(result => {
            this.project = result.project;
            this.cloudSolution = this.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'];
            if(this.cloudSolution.hasDataIngestion)
                this.dataIngestion = this.project['org.acme.cloud_solution_projects.Project'].dataIngestion['org.acme.cloud_solution_projects.DataIngestion'];
            if(this.cloudSolution.hasDataVisualization)
                this.dataVisualization = this.project['org.acme.cloud_solution_projects.Project'].dataVisualization['org.acme.cloud_solution_projects.DataVisualization'];
        });
    }

    onApprove(){
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.signal(null, projectId, "approveQuoteRequest").subscribe(result => {
            this._router.navigate(['projects/']);
        });
    }

    onModify(){
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.signal(null, projectId, "modifyQuoteRequest").subscribe(result => {
            this._router.navigate(['projects/' + projectId + '/cloud']);
        });
    }
}
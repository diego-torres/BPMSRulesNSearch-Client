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
            console.log(this.project);
            this.cloudSolution = this.project.cloudSolution;
            if(this.cloudSolution.hasDataIngestion)
                this.dataIngestion = this.project.dataIngestion;
            if(this.cloudSolution.hasDataVisualization)
                this.dataVisualization = this.project.dataVisualization;
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
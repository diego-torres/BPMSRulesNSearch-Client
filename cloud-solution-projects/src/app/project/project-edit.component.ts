import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ProjectService } from './project.service';

@Component({
    template: '<h1>Loading ...</h1>',
    providers: [ProjectService]
})
export class ProjectEditComponent implements OnInit {
    constructor(
        private _projectService: ProjectService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        let projectId = this._route.snapshot.paramMap.get('id');
        this._projectService.getProcessVariables(projectId).subscribe(result => {
            let viewName: string;
            viewName = result.project.viewRecommendation.viewName;
            if (viewName)
                this._router.navigate([viewName]);
            else
                this._router.navigate(['projects/' + projectId + '/cloud']);
        });
    }
}
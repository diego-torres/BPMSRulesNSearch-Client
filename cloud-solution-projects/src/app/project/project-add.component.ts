import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectService } from './project.service';


@Component({
    selector: 'project-add',
    templateUrl: 'project-add.html'
})
export class ProjectAddComponent {
    projectForm: FormGroup;
    constructor(private _fb: FormBuilder, private _projectService: ProjectService, private _router: Router) { }

    ngOnInit() {
        this.projectForm = this._fb.group({
            projectName: [],
            email: []
        });
    }

    onSubmit() {

        this._projectService.create(
            this.projectForm.controls['projectName'].value,
            this.projectForm.controls['email'].value)
            .subscribe(response => {
                this._projectService.getProcessVariables(response)
                    .subscribe(response => { 
                        //console.log('process variables: ' + response) 
                        let viewName: string;
                        viewName = response.project['org.acme.cloud_solution_projects.Project'].viewRecommendation['org.acme.cloud_solution_projects.ViewRecommendation'].viewName;
                        this._router.navigate([viewName]);
                    });
            }, err => {
                console.log(err);
                this._router.navigate(['projects']);
            });
    }

    onCancel(){
        this._router.navigate(['projects']);
    }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DatatableComponent } from '@swimlane/ngx-datatable';

import { Project } from './project';
import { ProjectService } from '../project/project.service';

@Component({
    selector: 'project-list',
    templateUrl: 'project-list.html',
    styleUrls: ['styles.css'],
    providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;

    selected = [];
    temp = [];
    rows = [];
    columns = [
        { prop: 'id' },
        { name: 'Name' },
        { name: 'status' },
        { name: 'cloud provider' },
        { name: 'location' },
        { name: 'data ingestion' },
        { name: 'data visualization' }
    ];

    constructor(private _router: Router, private _service: ProjectService) { }

    ngOnInit() {
        this._service.getAllProjects().subscribe(result => {
            for (let processInstance in result["process-instance"]) {
                let projectId = result["process-instance"][processInstance]["process-instance-id"];
                let projectStatusId = result["process-instance"][processInstance]["process-instance-state"];
                this._service.getProcessVariables(projectId).subscribe(pvResult => {
                    let project: Project = new Project();
                    project.id = projectId;
                    project.name = pvResult.project['org.acme.cloud_solution_projects.Project'].title;
                    project.status = projectStatusId == 1 ? 'Pending' : 'Quoted';
                    project.cloudProvider = pvResult.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'].cloudProvider;
                    project.location = pvResult.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'].locationCountry;

                    let hasDataIngestion: Boolean = pvResult.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'].hasDataIngestion;
                    let hasDataVisualization: Boolean = pvResult.project['org.acme.cloud_solution_projects.Project'].cloudSolution['org.acme.cloud_solution_projects.CloudSolution'].hasDataVisualization;

                    project.dataIngestion = hasDataIngestion && pvResult.project['org.acme.cloud_solution_projects.Project'].dataIngestion ? pvResult.project['org.acme.cloud_solution_projects.Project'].dataIngestion['org.acme.cloud_solution_projects.DataIngestion'].etlToolPreference : 'NA';
                    project.dataVisualization = hasDataVisualization && pvResult.project['org.acme.cloud_solution_projects.Project'].dataVisualization ? pvResult.project['org.acme.cloud_solution_projects.Project'].dataVisualization['org.acme.cloud_solution_projects.DataVisualization'].preferredVisualizationTool : 'NA';
                    this.rows.push(project);
                    this.temp.push(project);
                });
            }
        });
    }

    onUpdateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter out data
        const temp = this.temp.filter(function (f) {
            let nameMatches: Boolean = f.name && (f.name.toLowerCase().indexOf(val) !== -1 || !val);
            if (nameMatches) return true;
            let cloudProviderMatches: Boolean = f.cloudProvider && (f.cloudProvider.toLowerCase().indexOf(val) !== -1);
            if (cloudProviderMatches) return true;
            let dataIngestionMatches: Boolean = f.dataIngestion && (f.dataIngestion.toLowerCase().indexOf(val) !== -1);
            if (dataIngestionMatches) return true;
            let dataVisualizationMatches: Boolean = f.dataVisualization && (f.dataVisualization.toLowerCase().indexOf(val) !== -1);
            if (dataVisualizationMatches) return true;
            let locationMatches: Boolean = f.location && (f.location.toLowerCase().indexOf(val) !== -1);
            if (locationMatches) return true;

            return false;
        });

        // update the rows
        this.rows = temp;
        // go back to the first page
        this.table.offset = 0;
    }

    onClick() {
        this._router.navigate(['projects/add']);
    }

    onSelect({ selected }) {
        let selectedId: Number;
        selectedId = this.selected[0]['id'];
        this._router.navigate(['projects/edit', selectedId]);
    }
}
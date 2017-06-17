import { Component } from '@angular/core';

@Component({
    selector: 'project-list',
    templateUrl:'project-list.html',
    styleUrls: ['styles.css']
})
export class ProjectListComponent {
    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];
}
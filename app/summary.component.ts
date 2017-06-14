import { Component } from '@angular/core';

import { Summary } from './summary.model';

@Component({
    selector: 'summary-component',
    template: `<div class="alert alert-info">
    <h1>Cloud and Data Solution Quote Preview</h1>
    <b>Cloud Provider:</b>{{summary.cloudProvider}}<br />
    <b>Hosting at location:</b>{{summary.country}}<br />
    <div *ngIf="summary.hasDataIngestion">
        <h2>Data Ingestion</h2>
        <b>ETL:</b>{{summary.etl}}<br />
        <b *ngIf="summary.requiresLicence">Requires Licence:</b>Yes<br />
        <b *ngIf="!summary.requiresLicence">AIP Licence:</b>{{summary.aipLicenceNumber}}<br />
    </div>
    <div *ngIf="summary.hasDataVisualization">
        <h2>Data Visualization</h2>
        <b>Tool:</b>{{summary.visualizationTool}}<br />
        <b>Users:</b>{{summary.visualizationUsers}}<br />
        <b>Designers:</b>{{summary.visualizationDesigners}}<br />
    </div>
    <h2>Quoted Price: {{summary.price | currency:'USD':true}}</h2>
    </div>`,
    inputs: ['summary']
})
export class SummaryComponent {
    summary: Summary;
}
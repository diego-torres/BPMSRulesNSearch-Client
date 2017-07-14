import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
    private _url: string = "/database/mock-projects.json";
    private _kieServer: string = "http://localhost:8230/kie-server/services/rest";
    private _containerName: string = "org.acme:cloud-solution-projects:1.0";
    private _kieContainer: string = this._kieServer + "/server/containers/" + this._containerName;
    private _processName: string = "cloud-solution-projects.quote-cloud-solution";

    private _createInstanceUrl: string = this._kieContainer + "/processes/" + this._processName + "/instances";
    private _instanceVariablesUrl: string = this._kieContainer + "/processes/instances";
    constructor(private _http: Http) { }

    getAllProjects() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._kieServer + "/server/queries/containers/" + this._containerName + "/process/instances", options).map((r: Response) => r.json());
    }

    create(projectName: string, email: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });

        return this._http.post(
            this._createInstanceUrl,
            {
                "project": { "org.acme.cloud_solution_projects.Project": { "title": projectName, "email": email } }
            }, options)
            .map((response: Response) => response.json());
    }

    signal(project, projectId, signalName: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });
        let _project = project !== null ? {"org.acme.cloud_solution_projects.Project":project} : null;

        return this._http.post(
            this._instanceVariablesUrl + "/" + projectId + "/signal/" + signalName,
            _project, options)
            .map((response: Response) => { return "success" });
    }

    getProcessVariables(processInstanceId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._instanceVariablesUrl + "/" + processInstanceId + "/variables", options).map((r: Response) => r.json());
    }
}
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
    private _url: string = "/database/mock-projects.json";
    private _kieServer: string = "http://localhost:8230/kie-server/services/rest";
    private _kieContainer: string = this._kieServer + "/server/containers/org.acme:cloud-solution-projects:1.0";
    private _processName: string = "cloud-solution-projects.quote-cloud-solution";

    private _createInstanceUrl: string = this._kieContainer + "/processes/" + this._processName + "/instances";
    private _instanceVariablesUrl: string = this._kieContainer + "/processes/instances";
    constructor(private _http: Http) { }

    getAllProjects() {
        return this._http.get(this._url).map((response: Response) => response.json());
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

    signal(project: any, signalName: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });

        return this._http.post(
            this._instanceVariablesUrl + "/" + project['org.acme.cloud_solution_projects.Project'].id + "/signal/" + signalName,
            project, options)
            .map((response: Response) => { return "success" });
    }

    getProcessVariables(processInstanceId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Basic " + btoa('jboss' + ":" + 'bpms'));

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._instanceVariablesUrl + "/" + processInstanceId + "/variables", options).map((r: Response) => r.json());
    }
}
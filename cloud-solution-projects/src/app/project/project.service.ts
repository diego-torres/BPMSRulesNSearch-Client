import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
    private _url: string = "/database/mock-projects.json";
    constructor(private _http: Http) { }

    getAllProjects() {
        return this._http.get(this._url).map((response: Response) => response.json());
    }
}
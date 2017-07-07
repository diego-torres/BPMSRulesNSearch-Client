import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CloudProvidersService {
    private _url: string = "assets/database/cloud-providers.json";
    constructor(private _http: Http) { }

    getProviders() {
        return this._http.get(this._url).map((response: Response) => response.json());
    }
}
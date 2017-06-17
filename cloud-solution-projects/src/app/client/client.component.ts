import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'client-component',
    templateUrl: 'app/client/client.html'
})
export class ClientComponent implements OnInit {
    private _emailPattern: string = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+[a-zA-Z]{2,4}$';
    clientForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.clientForm = this._formBuilder.group({
            name: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern(this._emailPattern)]],
            projectName: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
        });
    }
}
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    // authors = [];
    newAuthor = {
        'name': ''
    }
    error: any;

    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) { }

    ngOnInit() {
    }


    onSubmit() {
        this._httpService.addAuthor(this.newAuthor).subscribe(data => {
            console.log('button works', data);
            if (data['error']) {
                console.log("working???");
                this.error = data['error']['errors']['name']['message'];
            }
            else {
                this.newAuthor = { name: '' }
                this.goHome();
            }
        });
    }

    goHome() {
        this._router.navigate(['/home'])
    }
}


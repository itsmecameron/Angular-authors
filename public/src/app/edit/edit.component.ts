import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
    selector: 'app-edit',
    templateUrl: './Edit.component.html',
    styleUrls: ['./Edit.component.css']
})
export class EditComponent implements OnInit {
    author = {
        'name': ''
    }
    authorID;
    error: any;

    constructor(
        private _httpService: HttpService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            // tslint:disable-next-line:no-string-literal
            console.log(params['id']);
            this.authorID = params['id'];
            console.log("auth id", this.authorID);
        });
        this.author = { name: '' };
        this.getAuthorById(this.authorID);
    }

    getAuthorById(authorID) {
        console.log(authorID);
        console.log("Im working beaches")

        this._httpService.getAuthorById(this.authorID).subscribe(data => {
            console.log('Got the author!!', data);
            this.author = data['data'];
            console.log(this.author,"hHhha");
            // console.log(this.editAuthor);
        });
    }

   updateAuthor(id) {
        console.log("step 1, click",this.authorID)
        this._httpService.updateAuthor(this.author, this.authorID).subscribe(data => {
            if (data['error']) {
                console.log("working???");
                this.error = data['error']['errors']['name']['message'];
            } else {
                console.log('Updated authors!', data);
                this.goHome();
            }
        });
    } 

    goHome() {
        this._router.navigate(['/home'])
    }
}


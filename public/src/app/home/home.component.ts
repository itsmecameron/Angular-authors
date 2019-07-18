import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    authors = [];
    
    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.getAuthorFromService();
    }

    getAuthorFromService() {
        this._httpService.getAuthors().subscribe(data => {
            console.log('Got your tasks:', data);
            this.authors = data['data']
        })
    }

    deleteAuthor(id) {
        let observable = this._httpService.deleteAuthor(id);
        observable.subscribe(data => {
            this.authors = data['data']
        })
        this.getAuthorFromService();
    }
}

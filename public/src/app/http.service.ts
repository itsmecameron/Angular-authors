import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) {
    }
    getAuthors() {
        return this._http.get('/authors');
    }

    addAuthor(newAuthor) {
        return this._http.post('/authors', newAuthor)
    }

    // getDescription(id) {
    //     return this._http.get('/tasks/' + id);
    // }
    getAuthorById(id) {
        return this._http.get('/authors/' + id);
    }

    deleteAuthor(id) {
        return this._http.delete('/authors/' + id)
    }

    updateAuthor(editAuthor, id) {
        console.log("STEP 2", editAuthor, id);

        return this._http.put('/authors/' + id, editAuthor);
    }
    // editAuthor(editAuthor) {
    //     return this._http.put('/authors/' + editAuthor.id, editAuthor)
    // }
}

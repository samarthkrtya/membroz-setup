import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

import { Configuration } from '../../../app.constants';

@Injectable({
    providedIn: 'root'
})

export class LangresourceService {

    supportedLanguages: any [] = [];

    constructor(
        private httpClient: HttpClient,
        private configuration: Configuration
    ) {
        var currentuser = JSON.parse(localStorage.getItem("currentUser"));

        if(currentuser && currentuser.organizationsetting && currentuser.organizationsetting.supportedlanguage) {
            this.supportedLanguages = []
            this.supportedLanguages = currentuser.organizationsetting.supportedlanguage;
        }
        
    }

    public GetAll () {
        return this.httpClient
            .get(this.configuration.actionUrl + 'langresources', { headers: this.configuration.headers })
    }

    public GetById (id: number) {
       return this.httpClient
           .get(this.configuration.actionUrl + 'langresources/' + id, { headers: this.configuration.headers })
    }

    public GetByFilter (data: any) {
        const toAdd = JSON.stringify(data);
        return this.httpClient.post(this.configuration.actionUrl + 'langresources/filter', toAdd, { headers: this.configuration.headers})
    }

    public AsyncGetByFilter (data: any) {
        const toAdd = JSON.stringify(data);
        return this.httpClient.post(this.configuration.actionUrl + 'langresources/filter', toAdd, { headers: this.configuration.headers})
        .toPromise()
    }

    public Add (data: any) {
       const toAdd = JSON.stringify(data);
       return this.httpClient.post(this.configuration.actionUrl + 'langresources', toAdd, { headers: this.configuration.headers})
    }

    public Update (id: number, data: any) {
       const toAdd = JSON.stringify(data);
       return this.httpClient.put(this.configuration.actionUrl + 'langresources/' + id, toAdd, { headers: this.configuration.headers })
    }

    public Delete (id: number) {
       return this.httpClient
           .delete(this.configuration.actionUrl + 'langresources/' + id, { headers: this.configuration.headers })
    }

   

}

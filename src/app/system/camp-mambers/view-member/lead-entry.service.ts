import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})


export class LeadEntryService {

    constructor(private _globals: AppGlobals,
        private httpClient: HttpClient,
        private _cf: CommonService,
        private http: Http,
        private _auth: AuthService) { }

    Controllers(model: Send) {
        return this.http.post(this._globals.baseAPIUrl + 'CampMem/getuniventry', model, this._cf.requestOptions()).pipe(
            map((response: any) => {
                return response.json();
            }), catchError(this._cf.handleError));
    }

    getMembers(id: number) {
        return this.http.get(this._globals.baseAPIUrl + 'CampMem/GetAllMemberByCampaignId/' + id.toString()).pipe(
            map((response: any) => {
                console.log('here: ', response.json());
                return response.json();
            }), catchError(this._cf.handleError));
    }
    EntryA(arr: any) {
        return this.http.post(this._globals.baseAPIUrl + 'CampMem/createuniv', arr).pipe(
            map((response: any) => {
                console.log('here: ', response.json());
                return response.json();
            }), catchError(this._cf.handleError));
    }

    EntryE(arr: any) {
        return this.http.post(this._globals.baseAPIUrl + 'CampMem/edituniv', arr).pipe(
            map((response: any) => {
                console.log('here: ', response.json());
                return response.json();
            }), catchError(this._cf.handleError));
    }
   
}


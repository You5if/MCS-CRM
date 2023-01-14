import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { LeadModel } from './lead.model';

@Injectable({
providedIn: 'root'
})

// Definition of service class
export class LeadService {

  leadId: number;
  businessLeadId: number;
  cTypeLeadId: number;
  leadClassId: number;
  leadStatusId: number;
  leadQualId: number;
  campId: number;

   // Constructor definition
   constructor(
       private _globals: AppGlobals,
       private httpClient: HttpClient,
       private _cf: CommonService,
       private http: Http,
       private _auth: AuthService,
     ) {
     }

   // Get entry method of the model, which fethces data based on provided id (int)
   getLeadEntry(id: number): Observable<LeadModel> {
      return this.httpClient.get<LeadModel>(this._globals.baseAPIUrl + 'Lead/' + id).pipe(
      map((result: LeadModel) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getLeadDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReport/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getCustomerTypeLeadDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReportByCustType/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getLeadClassDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReportByLeadClass/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getLeadStatusDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReportByLeadStatus/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getLeadQualDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReportByLeadQuali/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
     getBusinessLeadDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Lead/GetLeadReportByBusClass/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }
   getCampDetails(id: number): Observable<any> {
      return this.httpClient.get<any>(this._globals.baseAPIUrl + 'Campaign/GetEntryWithDetails/' + id).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
     }

   // Submit the form data to api through this method, (verify the audit column parameters are passed properly before production version is released)
   getLeadSubmit(data: LeadModel) {
      data.auditColumns = {
      'userId': 1,
      'hostname': 'test',
      'ipaddress': 'test',
      'devicetype': 'test',
      'macaddress': 'test',
      'companyId': 10001
      };
      switch (data.entryMode) {

          // Case A is for adding a new record
          case 'A': {
          return this.http.post(this._globals.baseAPIUrl + 'Lead/create', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case E is for editing an existing record
          case 'E': {
          return this.http.post(this._globals.baseAPIUrl + 'Lead/edit', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          // Case D is for deleting a record
          case 'D': {
          return this.http.post(this._globals.baseAPIUrl + 'Lead/delete', data, this._cf.requestOptions()).pipe(
          map((response: Response) => {
          return response.json();
          }), catchError(this._cf.handleError));
          }

          default: {
          break;
          }
      }
     }
}

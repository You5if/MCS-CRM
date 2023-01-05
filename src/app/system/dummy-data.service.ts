import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from 'src/app/app.global';
import { CommonService } from 'src/app/components/common/common.service';
import { map, catchError } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { AuthService } from 'src/app/components/security/auth/auth.service';


@Injectable({
providedIn: 'root'
})

// Definition of service class
export class DummyService {

    campProfile = [
        {
            campCode: 'CAMP001',
            campName: 'Marketing campaign',
            campObjective: '',
            plannedStartDate: '2023-01-04',
            plannedEndDate: '2023-01-04',
            actualStartDate: '2023-01-04',
            actualEndDate: '2023-01-04',
            remarks: '',
            campManagerId: 1,
            campManager: 'employee 1',
            hostId: 1,
            campHost: 'Corporate',
            

        },
        {
            campCode: 'CAMP002',
            campName: 'Medical campaign',
            campObjective: '',
            plannedStartDate: '2023-01-04',
            plannedEndDate: '2023-01-04',
            actualStartDate: '2023-01-04',
            actualEndDate: '2023-01-04',
            remarks: '',
            campManagerId: 2,
            campManager: 'employee 2',
            hostId: 3,
            campHost: 'Medical',
            

        },
        {
            campCode: 'CAMP003',
            campName: 'Agriculture campaign',
            campObjective: '',
            plannedStartDate: '2023-01-04',
            plannedEndDate: '2023-01-04',
            actualStartDate: '2023-01-04',
            actualEndDate: '2023-01-04',
            remarks: '',
            campManagerId: 3,
            campManager: 'employee 3',
            hostId: 5,
            campHost: 'Agriculture',
            

        },
    ]
    campActivities = [
        {
            campId: 1,
            campName: 'CAMP001:Marketing campaign',
            actCode: 'ACT001',
            actName: 'Activity 1',
            campObjective: '',
            startDate: '2023-01-04',
            endDate: '2023-01-04',
            remarks: '',
            campManagerId: 1,
            campManager: 'employee 1',
            
            

        },
        {
            campId: 2,
            campName: 'CAMP002:Medical campaign',
            actCode: 'ACT002',
            actName: 'Activity 2',
            campObjective: '',
            startDate: '2023-01-04',
            endDate: '2023-01-04',
            remarks: '',
            campManagerId: 2,
            campManager: 'employee 2',
            

        },
        {
            campId: 3,
            campName: 'CAMP003:Agriculture campaign',
            actCode: 'ACT003',
            actName: 'Activity 3',
            campObjective: '',
            startDate: '2023-01-04',
            endDate: '2023-01-04',
            remarks: '',
            campManagerId: 3,
            campManager: 'employee 3',
            

        },
    ]
    campBudget = [
        {
            campName: 'CAMP001:Marketing campaign',
            campId:1,
            date: '2023-01-04',
            remarks: '',
            currencyId: 1,
            currency: 'USD',
            amount: 5000
        },
        {
            campName: 'CAMP002:Medical campaign',
            date: '2023-01-04',
            remarks: '',
            campId:2,
            currencyId: 1,
            currency: 'SDG',
            amount: 75000
        },
        {
            campName: 'CAMP003:Agriculture campaign',
            date: '2023-01-04',
            remarks: '',
            campId:3,
            currencyId: 1,
            currency: 'AED',
            amount: 43000
        },
      
    ]
    campExpense = [
        {
            campName: 'CAMP001:Marketing campaign',
            campId:1,
            date: '2023-01-04',
            remarks: '',
            currencyId: 1,
            currency: 'USD',
            amount: 5000
        },
        {
            campName: 'CAMP002:Medical campaign',
            date: '2023-01-04',
            remarks: '',
            campId:2,
            currencyId: 1,
            currency: 'SDG',
            amount: 75000
        },
        {
            campName: 'CAMP003:Agriculture campaign',
            date: '2023-01-04',
            remarks: '',
            campId:3,
            currencyId: 1,
            currency: 'AED',
            amount: 43000
        },
      
    ]

    campManager = [
        {id: 1, name: 'employee 1'},
        {id: 2, name: 'employee 2'},
        {id: 3, name: 'employee 3'},
    ]
    campCurrency = [
        {id: 1, name: 'USD'},
        {id: 2, name: 'SDG'},
        {id: 3, name: 'AED'},
        {id: 4, name: 'Euro'},
    ]
    campHost = [
        {id: 1, name: 'HQ'},
        {id: 2, name: 'Corporate'},
        {id: 3, name: 'Medical'},
        {id: 4, name: 'Technical'},
        {id: 5, name: 'Agriculture'},
        
    ]

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
   
}

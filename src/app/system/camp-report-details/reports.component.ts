import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { LeadService } from '../lead/lead.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class CampReportDetailsComponent implements OnInit {
  
  direction: Direction;
  submit: string;
  leadReports: string;
  leads: SelectModel[];
  campId: number;
  camp: any;
  workShimmer: boolean;
  displayedColumns: string[] = ['position'];
  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns3: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:any[] =  []
  dataSource2:any[] = []
  dataSource3:any[] =  []

  balance: number = 0
  exBalance: number = 0;
  bBalance: number = 0;

  dum =  {
    "campaignId": 2,
    "campaignCode": "CAMP001",
    "campaignName": "Product launch",
    "objective": "Product launch",
    "plStDate": "2023-01-07T00:00:00",
    "plEnDate": "2023-01-07T00:00:00",
    "acStDate": "2023-01-07T00:00:00",
    "acEnDate": "2023-01-07T00:00:00",
    "remarks": "Product launch for 2023",
    "manager": 26,
    "host": 2,
    "active": true,
    "budgetTotal": 90000,
    "expenseTotal": 5000,
    "campActIndex": [
        {
            "campActId": 2,
            "campaignId": 2,
            "actCode": "ACT001",
            "actName": "January Product launch",
            "objective": "January Product launch",
            "stDate": "2023-01-07T00:00:00",
            "enDate": "2023-01-07T00:00:00",
            "remarks": "january 2023 product launch",
            "supervisor": 26,
            "campName": "Product launch",
            "supervisorName": "milesh@markoncs.com",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        }
    ],
    "campExpenseIndex": [
        {
            "campExpenseId": 2,
            "campaignId": 2,
            "expDate": "1900-01-01T00:00:00",
            "remarks": "",
            "currency": 17002,
            "amount": 35000,
            "forexRate": 0,
            "currencyName": "USD",
            "campName": "Product launch",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        },
        {
            "campExpenseId": 4,
            "campaignId": 2,
            "expDate": "2023-01-09T00:00:00",
            "remarks": "Good Cost",
            "currency": 17002,
            "amount": 1000,
            "forexRate": 5,
            "currencyName": "USD",
            "campName": "Product launch",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        }
    ],
    "campBudgetIndex": [
        {
            "campBudgetId": 2,
            "campaignId": 2,
            "budDate": "2023-01-01T00:00:00",
            "remarks": "New Product launch",
            "currency": 17002,
            "amount": 45000,
            "forexRate": 1,
            "currencyName": "USD",
            "campName": "Product launch",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        }
    ],
    "campMemIndex": [
        {
            "campMemId": 2,
            "campaignId": 2,
            "memberId": 379,
            "campName": "Product launch",
            "memberName": "mfuaad@unitedinsurance.ws",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        },
        {
            "campMemId": 3,
            "campaignId": 2,
            "memberId": 306,
            "campName": "Product launch",
            "memberName": " abdelrahim@unitedinsurance.ws ",
            "active": true,
            "totalPages": 1,
            "totalRecords": 1
        }
    ]
}

  constructor(
    private _globals: AppGlobals,
    private _select: SelectService,
    private _report: ReportPageService,
    private router: Router,
    private _ui: UIService,
    private leadService: LeadService,
  ) { }

  ngOnInit() {
    this.campId = this.leadService.campId
    this.leadService.getCampDetails(this.campId).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.camp = result
      this.dataSource = this.camp.campActIndex
      for (let i = 0; i < this.camp.campExpenseIndex.length; i++) {
        this.camp.campExpenseIndex[i].totalRow = this.camp.campExpenseIndex[i].amount * this.camp.campExpenseIndex[i].forexRate
        this.exBalance += this.camp.campExpenseIndex[i].totalRow
      }
      this.dataSource2 = this.camp.campExpenseIndex
      for (let i = 0; i < this.camp.campBudgetIndex.length; i++) {
        this.camp.campBudgetIndex[i].totalRow = this.camp.campBudgetIndex[i].amount * this.camp.campBudgetIndex[i].forexRate
        this.bBalance += this.camp.campBudgetIndex[i].totalRow
      }
      this.dataSource3 = this.camp.campBudgetIndex
      this.balance = this.bBalance - this.exBalance
    })
    // this.campId = this.leadService.campId
   
    
  }

  

}

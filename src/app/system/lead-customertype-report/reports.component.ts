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
export class LeadCustomerTypeReportComponent implements OnInit {
  
  direction: Direction;
  submit: string;
  leadReports: string;
  leads: any;
  leadId: number;
  lead: any;
  workShimmer: boolean;



  constructor(
    private _globals: AppGlobals,
    private _select: SelectService,
    private _report: ReportPageService,
    private router: Router,
    private _ui: UIService,
    private leadService: LeadService,
  ) { }

  ngOnInit() {
    this.leadId = this.leadService.cTypeLeadId
    this._ui.loadingStateChanged.next(false);
    this.leadService.getCustomerTypeLeadDetails(this.leadId).subscribe((result) => {
      this._ui.loadingStateChanged.next(false);
      this.leads = result
    })
  }

  

}

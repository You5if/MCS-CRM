import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { SelectService } from 'src/app/components/common/select.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { ReportPageService } from 'src/app/components/PR/report-page/report-page.service';
import { LeadService } from '../lead/lead.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class CampReportsComponent implements OnInit {
  
  direction: Direction;
  submit: string;
  campReports: string;
  camps: SelectModel[];
  campId: number;
  camp: string;
  workShimmer: boolean;

  constructor(
    private _globals: AppGlobals,
    private titleService: Title,
    private _select: SelectService,
    private _report: ReportPageService,
    private router: Router,
    private leadService: LeadService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle("CRM | Campaign Reports");

    this.workShimmer = true
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Get report"
      
      this.campReports = "Campaign Reports"
      this.camp = "Campaign"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "التقرير"
      
      this.campReports = "تقارير الحملات"
      this.camp = "الحملات"
      
    }

    this._select.getDropdown('campaignid','campaign',' campaignname','active=1 and deleted=0 and campaignid>1',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.camps = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
  }

  onReport() {
    if(this.campId > 0) {
      let reportId: number = 13;
      let restOfUrl: string;
      restOfUrl = 'campaign=' + this.campId.toString();
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      this.leadService.campId = this.campId
      this.router.navigate(['System/camp-report-details']);
      // this.router.navigate(['System/report-page']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      console.log(restOfUrl)
    }
  }

}

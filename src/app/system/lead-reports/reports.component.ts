import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
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
export class LeadReportsComponent implements OnInit {
  
  direction: Direction;
  submit: string;
  leadReports: string;
  leads: SelectModel[];
  leadId: number;
  lead: string;
  workShimmer: boolean;
  businessLeads: SelectModel[];
  businessLeadId: number;
  businessLead: string;
  businessLeadReports: string;
  cTypeLeads: SelectModel[];
  cTypeLeadId: number;
  cTypeLead: string;
  cTypeLeadReports: string;
  leadClasss: SelectModel[];
  leadClassId: number;
  leadClass: string;
  leadClassReports: string;
  leadStatuss: SelectModel[];
  leadStatusId: number;
  leadStatus: string;
  leadStatusReports: string;
  leadQuals: SelectModel[];
  leadQualId: number;
  leadQual: string;
  leadQualReports: string;

  constructor(
    private _globals: AppGlobals,
    private _select: SelectService,
    private _report: ReportPageService,
    private router: Router,
    private leadService: LeadService,
  ) { }

  ngOnInit() {
    this.workShimmer = true
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.submit = "Get report"
      
      this.leadReports = "Lead Reports"
      this.lead = "Lead"
      this.businessLeadReports = "Product Class Reports"
      this.businessLead = "Product Class"
      this.cTypeLeadReports = "Customer Type Reports"
      this.cTypeLead = "Customer Type"
      this.leadClassReports = "Lead Class Reports"
      this.leadClass = "Lead Class"
      this.leadStatusReports = "Lead Status Reports"
      this.leadStatus = "Lead Status"
      this.leadQualReports = "Lead Qualification Reports"
      this.leadQual = "Lead Qualification"
      
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.submit = "التقرير"
      
      this.leadReports = "تقارير الفرص"
      this.lead = "الفرص"
      this.businessLeadReports = "تقارير تصنيف النتجات"
      this.businessLead = "تصنيف المنتج"
      this.cTypeLeadReports = "تقارير تصنيف العملاء"
      this.cTypeLead = "تصنيف العملاء"
      this.leadClassReports = "تقارير تصنيف الفرص"
      this.leadClass = "تصنيف الفرص"
      this.leadClassReports = "تقارير حالات الفرص"
      this.leadClass = "حالات الفرص"
      this.leadClassReports = "تقارير مؤهلات الفرص"
      this.leadClass = "مؤهلات الفرص"
      
    }

    this._select.getDropdown('leadid','lead',' custname',' active=1 and deleted=0 and leadid>1',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.leads = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._select.getDropdown('miscdetailid','miscdetail',' misctext',' miscid=33',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.businessLeads = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._select.getDropdown('MiscDetailId','MiscDetail',' MiscText','Active=1 and MiscDetailId %3E 1 and MiscdetailId in (44002,44004)',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.cTypeLeads = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._select.getDropdown('MiscDetailId','MiscDetail',' MiscText','Active=1 and MiscDetailId %3E 1 and MiscId = 49',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.leadClasss = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._select.getDropdown('MiscDetailId','MiscDetail',' MiscText','Active=1 and MiscDetailId %3E 1 and MiscId = 47',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.leadStatuss = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
    this._select.getDropdown('MiscDetailId','MiscDetail',' MiscText','Active=1 and MiscDetailId %3E 1 and MiscId = 45',false).subscribe((res: SelectModel[]) => {
      this.workShimmer = false
      this.leadQuals = res;
      // this.technicians.push({id: this._auth.getUserId(), name: this._auth.getUniqueName()})
  });
  }

  onReport() {
    if(this.leadId > 0) {
      let reportId: number = 12;
      let restOfUrl: string;
      restOfUrl = 'lead=' + this.leadId.toString();
      this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.leadId = this.leadId
      this.router.navigate(['System/lead-report-details']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      console.log(restOfUrl)
    }
  }
  onBusinessReport() {
    if(this.businessLeadId > 0) {
      // let reportId: number = 12;
      // let restOfUrl: string;
      // restOfUrl = 'businessLeadId=' + this.businessLeadId.toString();
      // this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.businessLeadId = this.businessLeadId
      this.router.navigate(['System/lead-business-report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      // console.log(restOfUrl)
    }
  }
  onCTypeReport() {
    if(this.cTypeLeadId > 0) {
      // let reportId: number = 12;
      // let restOfUrl: string;
      // restOfUrl = 'cTypeLeadId=' + this.cTypeLeadId.toString();
      // this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.cTypeLeadId = this.cTypeLeadId
      this.router.navigate(['System/lead-customertype-report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      // console.log(restOfUrl)
    }
  }
  onLeadClassReport() {
    if(this.leadClassId > 0) {
      // let reportId: number = 12;
      // let restOfUrl: string;
      // restOfUrl = 'leadClassId=' + this.leadClassId.toString();
      // this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.leadClassId = this.leadClassId
      this.router.navigate(['System/lead-class-report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      // console.log(restOfUrl)
    }
  }
  onleadStatusReport() {
    if(this.leadStatusId > 0) {
      // let reportId: number = 12;
      // let restOfUrl: string;
      // restOfUrl = 'leadStatusId=' + this.leadStatusId.toString();
      // this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.leadStatusId = this.leadStatusId
      this.router.navigate(['System/lead-status-report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      // console.log(restOfUrl)
    }
  }
  onleadQualReport() {
    if(this.leadQualId > 0) {
      // let reportId: number = 12;
      // let restOfUrl: string;
      // restOfUrl = 'leadQualId=' + this.leadQualId.toString();
      // this._report.passReportData({ reportId: reportId, restOfUrl: restOfUrl });
      // this.router.navigate(['System/report-page']);
      this.leadService.leadQualId = this.leadQualId
      this.router.navigate(['System/lead-qualification-report']);
      // this.router.navigate([]).then(result => {  window.open(this._globals.baseAppUrl + '#/report'); });
      // window.open('#/report', '_blank');
      // console.log(restOfUrl)
    }
  }

}

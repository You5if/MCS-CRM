import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from 'src/app/components/common/common.service';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CProfileEntryComponent } from './lead-entry/lead-entry.component';
import { LeadModel } from './lead.model';
import { RightModel } from 'src/app/components/security/auth/rights.model';
import { RouterModule, Routes } from '@angular/router';
import { PageSortComponent } from 'src/app/components/common/pageevents/page-sort/page-sort.component';
import { LeadService } from './lead.service';
import { SelectModel } from 'src/app/components/misc/SelectModel';
import { SelectService } from 'src/app/components/common/select.service';
import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { Send } from 'src/app/send.model';
import { AppGlobals } from 'src/app/app.global';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DummyService } from '../dummy-data.service';
import { Title } from '@angular/platform-browser';
import { CMemebersEntryComponent } from '../camp-mambers/lead-entry/lead-entry.component';
import { viewMemebersEntryComponent } from '../camp-mambers/view-member/lead-entry.component';

@Component({
    selector: 'app-lead',
    templateUrl: './lead.component.html',
    styleUrls: ['./lead.component.scss']
  })

export class CProfileComponent implements OnInit {

  displayedColumns: string[] =
  ['fullName','custType', 'leadSt','viewMembers', 'members'];

dataSource: any;
listOfShimmer = [1, 2, 3, 4, 5];
isLastPage = false;
pTableName: string;
workShimmerBtn: boolean;
  workShimmerTable: boolean;
  workShimmerCard: boolean;
  workShimmerPaginator: boolean;
  workShimmerHeader:boolean;
  workShimmerCardBtn: boolean;
  headerToShow: any[] = []
  workShimmer:boolean;
pScreenId: number;
pTableId: number;
recordsPerPage: number;
currentPageIndex: number;
menuId: number;
leadSt: string;
leadEn: string;
clickedRows = new Set<any>();
selection = new SelectionModel<any>(true, []);fullName: string;
  custType: string;
  addMembers: string;
  viewMembers: string;
  headerToShow2: string[];
  tooltipDisable : boolean;
;

model: Send;
edit: string;

header: string;
bankName:string;
submit: string;
cancel: string;
direction: Direction;
indexes: any;
leadId:string;
role = localStorage.getItem("role");
opC: boolean = true

    totalRecords: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    screenRights: RightModel = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
  
      // Keyboard shortcuts handeler section
      @HostListener('document:keydown', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent): void {
          // console.log(this.pTableName, event);

          // shortct fo add new record using "Alt + Shift + n" keys
          if (event.keyCode == 78 && event.altKey && event.shiftKey && !this.workShimmer) {
            event.preventDefault();
            console.log("new tax");
            this.onAdd()
          }
      }

    constructor(
        public dialog: MatDialog,
        private _cf: CommonService,
        private _globals: AppGlobals,
        private _ui: UIService,
        private _msg: MessageBoxService,
        private _auth: AuthService,
        private _select: SelectService,
        private titleService: Title,
        private leadservice: LeadService,
        private dummyService: DummyService,
      ) {
        this.pTableName = 'Campaign';
        this.pScreenId = 120;
        this.pTableId = 120;
        this.recordsPerPage = 10;
        this.currentPageIndex = 1;
        this.menuId = 1019106011;
      }

  ngOnInit() {
    if (localStorage.getItem(this._globals.baseAppName + '_tooltip') === 'true') {
      this.tooltipDisable = true
    }else {
      this.tooltipDisable = false
    }
        this.titleService.setTitle("CRM | Campaign Profile");

      this.refreshMe();
  }

  refreshMe() {
    this.workShimmerBtn = true
    this.workShimmerHeader = true
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true
    this.workShimmerPaginator = true
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      this.direction = "ltr"
      this.header = "Campaign Profile"
      this.leadId = "leadId"
      this.fullName = "Code"
      this.custType = "Name"
      this.leadSt = "Manager"
      this.addMembers = "Add Member"
      this.viewMembers = "Members"
      // this.accountCode = "Account Code"
      // this.accountName = "Account Name"
      // this.accountType = "Account Type"
      
      this.edit = "Edit"
      this.submit = "Submit"
      this.cancel = "Cancel"
      this.headerToShow = [this.fullName, this.custType,this.leadSt, this.viewMembers, this.addMembers]
      this.headerToShow2 = ['', '']

    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      this.direction = "rtl"
      this.header = "ملف الحملة"
      this.leadSt = "بدأ"
      this.fullName = "الرمز"
      this.custType = "الاسم"
      this.leadSt = "المدير"
      this.addMembers = "اضافة عضو"
      this.viewMembers = "الاعضاء"
      
      // this.accountCode = "رمز الحساب"
      // this.accountName = "اسم الحساب"
      // this.accountType = "نوع الحساب"
     
      this.edit = "تعديل"
      this.submit = "ارسال"
      this.cancel = "الغاء"
      this.headerToShow = [this.fullName, this.custType,this.leadSt, this.viewMembers, this.addMembers]
      this.headerToShow2 = ['']
    }
   
    this._cf.getPageData('Campaign', this.pScreenId, this._auth.getUserId(), this.pTableId,
      this.recordsPerPage, this.currentPageIndex, false).subscribe(
        (result) => {
          this.workShimmerBtn = false
          this.workShimmerHeader = false
    this.workShimmerTable = false
    this.workShimmerCard = false
    this.workShimmerCardBtn = false
    this.workShimmerPaginator = false
          console.log(result);
          
          this.totalRecords = result[0].totalRecords;
          this.recordsPerPage = this.recordsPerPage;
          this.dataSource = new MatTableDataSource(result);
          this.indexes = result
        }
      );

    this._auth.getScreenRights(this.menuId).subscribe((rights: RightModel) => {
      this.screenRights = {
        amendFlag: true,
        createFlag: true,
        deleteFlag: true,
        editFlag: true,
        exportFlag: true,
        printFlag: true,
        reverseFlag: true,
        shortCloseFlag: true,
        viewFlag: true
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatoryOperation(event: PageEvent) {
    this.workShimmerTable = true
    this.workShimmerCard = true
    this.workShimmerCardBtn = true

    try {
      this._cf.getPageDataOnPaginatorOperation(event, this.pTableName, this.pScreenId, this._auth.getUserId(),
        this.pTableId, this.totalRecords).subscribe(
          (result: any) => {
            this.workShimmerTable = false
    this.workShimmerCard = false
    this.workShimmerCardBtn = false
    
            // this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            this.dataSource = result;
          }, error => {
            // this._ui.loadingStateChanged.next(false);
            this._msg.showAPIError(error);
            return false;
          });
    } catch (error:any) {
      // this._ui.loadingStateChanged.next(false);
      this._msg.showAPIError(error);
      return false;
    }
  }

  onSort  () {
    const dialogRef = this.dialog.open(PageSortComponent, {
      disableClose: true,
      data: this.pTableId
    });
  };

  onAdd  () {
    this.model = {
      tableId: 120,
      recordId: 0,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add campaign");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة حملة");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Add");
    }
    
    this.openEntry2(this.model);
  };

  onView = (id: number) => {
    this._ui.loadingStateChanged.next(true);
    this.leadservice.getLeadEntry(id).subscribe((result: LeadModel) => {
      this._ui.loadingStateChanged.next(false);
      result.entryMode = 'V';
      result.readOnly = true;
      this.openEntry(result);
    });
  }

  onViewMembers(id: number) {

    this.opC = false
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Members");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "الاعضاء");
    }
   
      const dialogRef3 = this.dialog.open(viewMemebersEntryComponent, {
        disableClose: true,
        
        data: id
      });
      dialogRef3.afterClosed().subscribe(() => {
        this.refreshMe();
      });
   
    

  }
  onAddMembers(id: number) {
    this.opC = false
    this.model = {
      tableId: 121,
      recordId: 0,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Add members");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "اضافة اعضاء");
    }
    
    this.openEntryMembers(this.model, id);

  }

  onEdit = (id: number) => {
    if (this.opC == true) {
    this.model = {
      tableId: 120,
      recordId: id,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "Edit campaign");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit', "تعديل حملة");
      localStorage.setItem(this._globals.baseAppName + '_Add&Edit2', "Edit");
    }
    
    this.openEntry2(this.model)
  }else {
    this._ui.loadingStateChanged.next(false);
    this.opC = true
  }
  }

  onDelete = function(id: number) {
      
  };

 

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear() ,this.clickedRows.clear()):
        (this.selection.clear(), this.dataSource.data.forEach((row :any)=> {this.selection.select(row); if (!this.clickedRows.has(row)) {

          this.clickedRows.add(row)
        }}))
  }

  onId(id: number, row:LeadModel) {
    
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row)
    }else {
      this.clickedRows.add(row)
    }

  }

  openEntryMembers  (result: any, id:number) {
    if (result === undefined) {
      const dialogRef2 = this.dialog.open(CMemebersEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef2.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef2 = this.dialog.open(CMemebersEntryComponent, {
        disableClose: true,
        
        data: {
          data: result,
          campId: id
        }
      });
      dialogRef2.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };


  openEntry  (result: LeadModel) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CProfileEntryComponent, {
        disableClose: true,
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CProfileEntryComponent, {
        disableClose: false,
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

  openEntry2  (result: any) {
    if (result === undefined) {
      const dialogRef = this.dialog.open(CProfileEntryComponent, {
        disableClose: true,
        
        data: {}
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    } else {
      const dialogRef = this.dialog.open(CProfileEntryComponent, {
        disableClose: true,
        
        data: result
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshMe();
      });
    }
  };

}

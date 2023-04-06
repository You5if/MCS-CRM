import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from 'src/app/components/shared/uiservices/UI.service';
import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
import { AuthService } from 'src/app/components/security/auth/auth.service';
import { CommonService } from 'src/app/components/common/common.service';
import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
import { Observable, of } from 'rxjs';
import { SelectModel, SelectCodeModel } from 'src/app/components/misc/SelectModel';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap, map } from 'rxjs/operators';
import { SelectService } from 'src/app/components/common/select.service';
import { AppGlobals } from 'src/app/app.global';
import { Send } from 'src/app/send.model';
import { Sources } from 'src/app/source.model';
import { LeadEntryService } from './lead-entry.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { DummyService } from '../../dummy-data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CheckfordeleteComponent } from '../../operation/checkfordelete/checkfordelete.component';
import { DeleteModel } from '../../camp-profile/lead.model';
import { CMemebersEntryComponent } from '../lead-entry/lead-entry.component';

@Component({
  selector: 'app-lead-entry',
  templateUrl: './lead-entry.component.html',
  styleUrls: ['./lead-entry.component.scss']
})

export class viewMemebersEntryComponent implements OnInit {

  dummy = {
    campaignId: 0,
    

}
campManager = [
  {id: 1, name: 'employee 1'},
  {id: 2, name: 'employee 2'},
  {id: 3, name: 'employee 3'},
]
campHost = [
  {id: 1, name: 'HQ'},
  {id: 2, name: 'Corporate'},
  {id: 3, name: 'Medical'},
  {id: 4, name: 'Technical'},
  {id: 5, name: 'Agriculture'},
  
]
	url: string;

    model: Send = {
      tableId: 121,
      recordId: 0,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };

    last: any = {
      records: [],
      auditColumn: {
        approvalStatusId: 1100001,
        companyId: 10001,
        branchId: 201,
        financialYearId: 1,
        userId: 1,
        mACAddress: "unidentified",
        hostName: "unidentified",
        iPAddress: "unidentified",
        deviceType: "Win32"
      }
    }
    myFormGroup: FormGroup;
    members: any[] = []
    breakpoint: number;
    checked= false;
    checkedR = false;
    disabled = false;
    sources: Sources[] = [];
    res: any;
    spacepoint: any;
    spacezone: boolean;
    data: Sources[];
    ver: Sources;
    maxSize: number;
    submit: string;
    cancel: string;
  
    light: Sources[] = [];
    dark: Sources[] = [];
  
    ver2: Sources;
    ver3: Sources;
    ver4: Sources;
    obj1: Sources;
    obj2: Sources;
  
    direction: Direction;
    deleteModel!: DeleteModel
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string |null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];
    noMembers: boolean;

    showCustDrop: boolean = false
    showCustName: boolean = false
    todo = ['employee 1','employee 2','employee 4',];

  done = ['employee 3',];
  workShimmer: boolean;
  addMember: string;
  dialog_title2: string;
  noMem: boolean = true;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  constructor(
	  private dapiService: LeadEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      public dialog: MatDialog,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dummyService: DummyService,
      private dialogRef: MatDialogRef<viewMemebersEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: any
  ) { }

  ngOnInit() {
    console.log(this.pModel);
    
    this.refreshMe()
      
      
  }
  refreshMe() {
    this.workShimmer = true
    
    // this._ui.loadingStateChanged.next(true);
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.addMember = "No added members"
        this.dialog_title2 = "Members"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.addMember = "لا يوجد اعضاء بعد"
        this.submit = "ارسال"
        this.dialog_title2 = "الاعضاء"
        this.cancel = "الغاء"
      }

      this.dapiService.getMembers(this.pModel).subscribe((result) => {
        
        this.workShimmer = false
        this.members = result
        if (this.members.length == 0) {
          this.members = [{memberId:0, memberName: this.addMember}]
        }
        
      })
  }

  onRemoveMem(idAC: number) {
    
      this.deleteModel = {
        name: 'Campmem',
        id: idAC
      }
      this.openConfirmDialog(this.deleteModel)
      // this._ui.loadingStateChanged.next(true);
      // this.invoiceservice.getDelete(id).subscribe((result) => {
      //   this._ui.loadingStateChanged.next(false);
      //   this.refreshMe();
      // })
    
}

openConfirmDialog(result: any) {
  if (result === undefined) {
    const dialogRef = this.dialog.open(CheckfordeleteComponent, {
      disableClose: true,

      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  } else {
    const dialogRef = this.dialog.open(CheckfordeleteComponent, {
      disableClose: true,

      data: result
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshMe();
    });
  }
}

onAddMembers(id: number) {
 
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
 

  onResize(event:any) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : 3;
  }

  onCancel() {
    this.dialogRef.close();
  }
}


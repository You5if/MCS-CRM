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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';
import { DummyService } from '../../dummy-data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  
    dropItem: Sources;
    container: any[][] =[];
  
    accountList: SelectModel[] = [];
  
    dialog_title: string |null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];

    showCustDrop: boolean = false
    showCustName: boolean = false
    todo = ['employee 1','employee 2','employee 4',];

  done = ['employee 3',];
  workShimmer: boolean;

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
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dummyService: DummyService,
      private dialogRef: MatDialogRef<viewMemebersEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: any
  ) { }

  ngOnInit() {
    this.workShimmer = true
    // this._ui.loadingStateChanged.next(true);
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this.dapiService.getMembers(this.pModel).subscribe((result) => {
        this.workShimmer = false
        this.members = result
      })
      
      
  }

 

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


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
import { CustProfEntryService } from './custprof-entry.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-custprof-entry',
  templateUrl: './custprof-entry.component.html',
  styleUrls: ['./custprof-entry.component.scss']
})

export class CustProfEntryComponent implements OnInit {

	url: string;

    model: Send = {
      tableId: 109,
      recordId: 0,
      userId: Number(this._auth.getUserId()),
      roleId: Number(localStorage.getItem('role')),
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };

   
    myFormGroup: FormGroup;

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
  
    dialog_title: string | null = localStorage.getItem(this._globals.baseAppName + '_Add&Edit');
  
    dropList: Sources[] = [];

    model2!: Send ;
    childElemInit: Sources[] = [];
    dropListItem: Sources[] = [];
    dropItemchild!: Sources;
    verCh2!: Sources;

    last: any = {
      records: [],
      child1: [],
      child2: [],
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
    lastDark: any = {
      records: [],
      child1: [],
      child2: [],
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

    childElemDark: Sources[] = [];
    childElem2: any = {
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

    childElem: any = {
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
  constructor(
	  private dapiService: CustProfEntryService,
      private _ui: UIService,
      private _msg: MessageBoxService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      private _select: SelectService,
      private dialogRef: MatDialogRef<CustProfEntryComponent>,
      @Inject(MAT_DIALOG_DATA) public pModel: Send
  ) { }

  ngOnInit() {
    if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit') == "Add") {
      console.log("dot");
      
      this.addChild1ExpenseItem(0)
      
    }
    if(localStorage.getItem(this._globals.baseAppName + '_language') == "16001") {
        this.direction = "ltr"
        this.submit = "Submit"
        this.cancel = "Cancel"
      }else if(localStorage.getItem(this._globals.baseAppName + '_language') == "16002") {
        this.direction = "rtl"
        this.submit = "ارسال"
        this.cancel = "الغاء"
      }

      this._ui.loadingStateChanged.next(true);
      this.dapiService.Controllers(this.pModel).subscribe(res => {
        this._ui.loadingStateChanged.next(false);
        this.data = res;
  
        if(localStorage.getItem(this._globals.baseAppName + '_Add&Edit2') == "Edit") {
          console.log(this.data.length)
        if(this.data.length > 0) {
          console.log(this.data[0].value)
  
          this.dapiService.getChild1byChild1(+this.data[0].value).subscribe((res) => {
    
            console.log("EditRes",res)
          this._ui.loadingStateChanged.next(false);
          
            
  
            
            for(let k=0;k<res.length;k++){
              this.addChild1ExpenseItem(res[k].custAddrDetId)
              
              
              
            }
  
            // this.onChangeValueC(+this.data[5].value)
            
            
            
           
  
  
      
    }
    
  
            
            
            
          
          )
          // this.dapiService.getChild2byChild2(+this.data[0].value).subscribe((res) => {
  
            
          //   this._ui.loadingStateChanged.next(false);
          //   // console.log("EditRes",res)
          //   // console.log("res:", res)
          //   for(let k=0;k<res.length;k++){
          //     this.addChild2ExpenseTax(res[k].invoiceTaxId)
          //   }
  
            
            
          // }
          // )
        }else {
          this.addChild1ExpenseItem(0)
        }
        
       
        
      }
        for(let i=0;i<=this.data.length;i++){
          this.ver2 = this.data[i]
          if (this.ver2 && this.ver2.inTransaction && this.ver2.access != "NoAccess"){
            if (this.ver2.type === "dropdown") {
              this.dropList.push(this.ver2);
              console.log("droplist: ",this.dropList)
            }
            this.light.push(this.ver2);
  
          }else{
            if(this.ver2) {
              this.dark.push(this.ver2);
            }
          }
        }
        this.breakpoint =
        window.innerWidth <= 960
          ? 1
          : this.data[0].maxRowSize;
  
        for(let k=0;k<=this.dropList.length;k++) {
          this.dropItem = this.dropList[k]
  
          this._select.getDropdown(this.dropItem.refId, this.dropItem.refTable, this.dropItem.refColumn, this.dropItem.refCondition, false).subscribe((res: SelectModel[]) => {
          this.dropList[k].myarray = res;
          this.container.push(res);
      });
  
        }  
      })
  }
  addChild1ExpenseItem(id:number) {  
    let myElem = {
      records: []as any[],
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
    let childElemDark2 = {
      records: []as any[],
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
    this.model2 = {
      tableId: 110,
      recordId: id,
      userId: 26,
      roleId: 2,
      languageId: Number(localStorage.getItem(this._globals.baseAppName + '_language'))
    };
    this._ui.loadingStateChanged.next(true);
    this.dapiService.child1Controllers(this.model2).subscribe((res) => {
      this._ui.loadingStateChanged.next(false);

      this.childElemInit = res
      console.log(this.childElemInit)
      // this.childElemInit[2].refCondition = this.childElemInit[2].refCondition + this.data[12].value
      this.dropListItem.push(this.childElemInit[1])
      this.dropListItem.push(this.childElemInit[4])
      for(let k=0;k<this.dropListItem.length;k++) {
        console.log("loop cycle" + k)
        this.dropItemchild = this.dropListItem[k]
        console.log("DropitemTax", this.dropItemchild)

            // this.tableId = this.dropItem.refId;
            // this.tableName = this.dropItem.refTable;
            // this.displayColumn = this.dropItem.refColumn;
            // this.condition = this.dropItem.refCondition;
            
            
            if(this.dropItemchild.tableColumnId == 290) {
              var dt = new Date(this.data[2].value);
              console.log("Al:", +this.data[6].value);
              this.dropItemchild.idCount = this.dropItemchild.value
             if (this.data[12].value != "1") {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition + this.data[12].value, false).subscribe((res: SelectModel[]) => {
                console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                // this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
             }else {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                // this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
             }
            }else if(this.dropItemchild.tableColumnId == 292) {
              var dt = new Date(this.data[2].value);
              console.log("Al:", +this.data[6].value);
              // this.dapiService.getProductPricing2(+this.childElemInit[2].value, +this.data[6].value, this.data[2].value).subscribe((result) => {
              //   this.dropItemchild.myarray = result
              //   console.log("Al:", this.dropItemchild.myarray);
              //   for (let i = 0; i < this.dropItemchild.myarray.length; i++) {
              //     if (this.dropItemchild.myarray[i].unitId == +this.dropItemchild.value) {
              //       console.log("Tes");
                    
              //       if (this.childElemInit[5].value == "0.00") {
              //         this.childElemInit[5].value = this.dropItemchild.myarray[i].unitPrice
              //       this.childElemInit[6].value = (+this.childElemInit[3].value * this.dropItemchild.myarray[i].unitPrice).toString()
              //       }else {
              //         this.childElemInit[6].value = (+this.childElemInit[3].value * +this.childElemInit[5].value).toString()
              //       }
              //     }
                  
              //   }
                
              // })

            }else {
              this._select.getDropdown(this.dropItemchild.refId, this.dropItemchild.refTable, this.dropItemchild.refColumn, this.dropItemchild.refCondition, false).subscribe((res: SelectModel[]) => {
                // console.log("drop: ", res);
                this.dropListItem[k].myarray = res;
                // this.onChangeValue(+this.dropListItem[k].value, (k/2) )
              });
            }

            
            
          
        
        // this.container.push(res);
        // console.log(this.container)


    
  }

  
      

      for(let i=0;i<this.childElemInit.length;i++){
        this.verCh2 = this.childElemInit[i]
        childElemDark2.records.push(this.verCh2);
        

      }
      this.lastDark.child1.push(childElemDark2);
      // this.allTotal()
      this.childElemInit.forEach((itemE) =>{
        if (itemE && itemE.inTransaction && itemE.access != "NoAccess"){
          
          // this.childElem.records.push(itemE);
          myElem.records.push(itemE)
          
  
        }else{
          
            this.childElemDark.push(this.verCh2);
            // console.log(this.childElemDark)
          
  
  
        }
      })
      
      // this.childElem = res
      // console.log(JSON.stringify(this.child1Data))
      this.childElem2 = null
      this.childElem2 = this.childElem

      //this.last.child1.push(this.childElem2);
      this.last.child1.push(myElem)
      
      
      
      
      
     
      
    })
    console.log("child1 final", this.last)
    console.log("DarlDarl",this.lastDark)
    console.log(this.data);
    
    
    
    

    
    
    

    

    
  }
  onChange(){}
  deleteFun(id: number) {
    console.log('I ran from delete');
    // this.elem.splice(id, 1);
    
    this.last.child1.splice(id, 1)
    if(this.last.child1.length == 0){
      this.addChild1ExpenseItem(0)
    }
   
    }

    onSubmit() {

      // this.data.forEach((Object)=> this.light.forEach((obj)=>
      // {
      //   if(Object.tableColumnId === obj.tableColumnId){
      //     Object.value = obj.value
      //   }
  
      // }));
      // this.childElemInit.forEach((Object)=> this.childElem.forEach((obj)=>
      // {
      //   if(Object.tableColumnId === obj.tableColumnId){
      //     Object.value = obj.value
      //   }
  
      // }));
  
      // console.log(JSON.stringify(this.data))
  
      for(let i=0;i<=this.data.length;i++){
        this.obj1 = this.data[i];
         if(this.obj1 ){
          //  this.last.records.push(this.obj1);
           this.lastDark.records.push(this.obj1);
         }
       }
  
      //  console.log(JSON.stringify(this.last));
      //  console.log("Dark",JSON.stringify(this.lastDark));
  
      //  for(let i=0; i< this.lastDark.child1.length;i++){
      //    if (this.lastDark.child1[0].records[3].value == "0.000000") {
      //     this.lastDark.child1.splice(0, 1)
      //    }
      //    this.lastDark.child1[i].records[0].value = "0"
      //    this.lastDark.child1[i].records[1].value = this.lastDark.records[0].value
      //    this.vale = this.lastDark.child1[i].records
      //    this.vale.forEach((val) => {
      //      val.entryMode = "A"
      //    })
      //  }
  
       console.log("Dark",JSON.stringify(this.lastDark));
  
       this.lastDark.records.sort(function(a:any, b:any) { 
        return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
      });
      for (let i = 0; i < this.lastDark.child1.length; i++) {
        this.lastDark.child1[i].records.sort(function(a:any, b:any) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
      for (let i = 0; i < this.lastDark.child2.length; i++) {
        this.lastDark.child2[i].records.sort(function(a:any, b:any) { 
          return a.applicationOrder - b.applicationOrder  ||  a.label.localeCompare(b.label);
        });
      }
       
      
       console.log("Dark",this.lastDark);
        
       if(this.last.records[0].entryMode == "A"){
        this.last.auditColumn = this._auth.getAuditColumns();
        this.dapiService.EntryA(this.last).subscribe(nexto => {
          this.res = nexto;
          this._msg.showInfo("Success", this.res.errorMessage);
         this.dialogRef.close();
  
        }, error => {
          console.log(error);
          this._msg.showInfo("Error", error.errorMessage);
         this.dialogRef.close();
        });
      }else if(this.last.records[0].entryMode == "E"){
        this.last.auditColumn = this._auth.getAuditColumns();
        this.dapiService.EntryE(this.last).subscribe(nexto => {
          this.res = nexto;
          this._msg.showInfo("Success", this.res.errorMessage);
         this.dialogRef.close();
  
        }, error => {
          this._msg.showInfo("Error", error.errorMessage);
         this.dialogRef.close();
        });
      }
  
        }

  onResize(event:any) {
    this.spacepoint =
      event.target.innerWidth <= 960
        ? (this.spacezone = false)
        : (this.spacezone = true);
    this.breakpoint =
      event.target.innerWidth <= 960
        ? 1
        : this.data[0].maxRowSize;
  }

  onCancel() {
    this.dialogRef.close();
  }
}


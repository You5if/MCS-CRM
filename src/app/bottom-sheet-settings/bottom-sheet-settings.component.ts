import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-bottom-sheet-settings',
  templateUrl: './bottom-sheet-settings.component.html',
  styleUrls: ['./bottom-sheet-settings.component.scss']
})
export class BottomSheetSettingsComponent implements OnInit {

  toolTipDisable:boolean;
  checkedTooltip:boolean = false;

  constructor(
    private _globals: AppGlobals,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetSettingsComponent>
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ontooltip() {
    this.toolTipDisable  = !this.toolTipDisable
    localStorage.setItem(this._globals.baseAppName + '_tooltip', this.toolTipDisable.toString())
    console.log(this.toolTipDisable);
    
  }

  ngOnInit(): void {
    if (localStorage.getItem(this._globals.baseAppName + '_tooltip') === 'true') {
      this.toolTipDisable = true
      this.checkedTooltip = true
    }else {
      this.toolTipDisable = false
      this.checkedTooltip = false
    }
  }

}

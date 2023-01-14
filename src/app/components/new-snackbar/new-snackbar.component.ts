import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-snackbar',
  templateUrl: './new-snackbar.component.html',
  styleUrls: ['./new-snackbar.component.scss']
})
export class NewSnackbarComponent implements OnInit {

  snackBarRef = inject(MatSnackBarRef);
  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}

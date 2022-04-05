import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {

  constructor(public dialog:MatDialogRef<ViewFileComponent>,@Inject(MAT_DIALOG_DATA) public receipt: any) { }

  ngOnInit(): void {
  }
  close(){
    this.dialog.close();
  }
  print()
  {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href =this.receipt;
    link.download='';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

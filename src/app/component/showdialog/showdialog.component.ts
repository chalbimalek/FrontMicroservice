import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showdialog',
  templateUrl: './showdialog.component.html',
  styleUrls: ['./showdialog.component.css']
})
export class ShowdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}


  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);

  }

}

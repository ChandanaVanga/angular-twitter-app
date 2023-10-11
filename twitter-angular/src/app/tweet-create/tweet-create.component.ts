import { Component, OnInit  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.css']
})
export class TweetCreateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<TweetCreateComponent>) { }

  ngOnInit() {
  }

  // This method is called when the "Close" button is clicked in the dialog.
  closeDialog(): void {
    this.dialogRef.close();
  }
}

import { GameApiService } from './../game-api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-murderer-select-dialog',
  templateUrl: './murderer-select-dialog.component.html',
  styleUrls: ['./murderer-select-dialog.component.scss']
})
export class MurdererSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MurdererSelectDialogComponent>, public gameApi: GameApiService) {

  }

  onClueSelect(cardName: string) {
    
  }

  onMeansSelect(cardName: string) {

  }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}

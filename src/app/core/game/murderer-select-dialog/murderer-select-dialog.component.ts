import {GameApiService} from '../../../shared/api/game/game-api.service';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {PlayerApiService} from '../../../shared/api/player/player-api.service';
import {TgPlayer} from '../../../shared/api/firebase/GameSnapshot';

@Component({
  selector: 'app-murderer-select-dialog',
  templateUrl: './murderer-select-dialog.component.html',
  styleUrls: ['./murderer-select-dialog.component.scss']
})
export class MurdererSelectDialogComponent implements OnInit {
  @Input() player: TgPlayer;

  constructor(
    public dialogRef: MatDialogRef<MurdererSelectDialogComponent>,
  ) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

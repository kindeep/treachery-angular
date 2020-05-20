import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { 

  }

  public error(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}

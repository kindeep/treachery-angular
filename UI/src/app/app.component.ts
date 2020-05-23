import { AuthService } from './shared/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AvatarService } from './shared/api/avatar/avatar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deceptiongame';
  constructor(public authService: AuthService, public avatar: AvatarService ) { }

  ngOnInit() {
    this.authService.anonymousLogin();
  }
  
}

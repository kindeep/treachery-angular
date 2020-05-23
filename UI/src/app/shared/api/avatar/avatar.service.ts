import { Injectable } from '@angular/core';
import { generateRandomAvatar, generateOptionsString } from 'seedable-random-avatar-generator';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  images$: BehaviorSubject<Object>;

  constructor(private storage: AngularFireStorage) { 
    this.images$ = new BehaviorSubject(new Map());
  }

  getAvatar(uid: string) {
    return generateRandomAvatar(uid);
  }
}

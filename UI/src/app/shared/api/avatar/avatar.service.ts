import { Injectable } from '@angular/core';
import { generateRandomAvatar } from 'seedable-random-avatar-generator';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  getAvatar(uid: string) {
    return generateRandomAvatar(uid);
  }
}

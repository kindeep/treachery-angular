import { Component, OnInit, Input } from '@angular/core';
import { AvatarService } from './../../api/avatar/avatar.service'
import ColorHash from 'color-hash';

@Component({
  selector: 'tg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  cash = new ColorHash({hash: (str) => {
    if(!str) return 0;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash;
  }});
  @Input() uid: string;
  src: string;
  fill = '000000'
  defaultSvgUri() {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23${this.fill}' width='18px' height='18px'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E`;
  }
  constructor(private avatar: AvatarService) {
  }

  ngOnInit(): void {
    this.src = this.avatar.getAvatar(this.uid);
    this.fill = this.cash.hex(this.uid).replace('#', '');
  }

}

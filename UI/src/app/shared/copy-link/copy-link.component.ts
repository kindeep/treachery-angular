import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tg-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.scss']
})
export class CopyLinkComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}

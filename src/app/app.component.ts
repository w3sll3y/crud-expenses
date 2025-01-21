import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router: Router) {
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => this.router.navigate(['/']), icon: 'ph ph-house', shortLabel: 'Home' },
    { label: 'Registrar', action: this.aboutClick.bind(this), icon: 'ph ph-clipboard-text', shortLabel: 'Registro' },
  ];

  private aboutClick() {
    this.router.navigate(['/', 'register']);
  }
}
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.closeMenuOnClick();
    }
  }

  closeMenuOnClick(): void {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('header ul');

    if (menuToggle && menuItems) {
      document.querySelectorAll('header a').forEach(link => {
        link.addEventListener('click', () => {
          menuItems.classList.remove('show');
        });
      });

      menuToggle.addEventListener('click', () => {
        menuItems.classList.toggle('show');
      });
    }
  }
}
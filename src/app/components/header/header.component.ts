import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  isLoggedIn: boolean = false;
  showCreateProjectLink: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.username = this.authService.getUsername();
    });

    // Maneja los eventos de cambio de ruta para actualizar el estado de inicio de sesión
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.authService.checkLoginStatus();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.closeMenuOnClick();
    }
  }

  closeMenuOnClick(): void {
    const menuItems = document.querySelector('header ul');
    document.querySelectorAll('header a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuItems) {
          menuItems.classList.remove('show');
          const checkbox = document.getElementById('checkbox') as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = false;
          }
        }
      });
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  scrollToTopAndNavigate(projectId: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/login']);
  }

  scrollAndNavigate(projectId: string) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/crear-proyecto']);
  }
}

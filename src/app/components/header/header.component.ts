import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router,  NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  isLoggedIn: boolean = false;
  showCreateProjectLink: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.username = this.authService.getUsername();


      // if (loggedIn && this.router.url.includes('/crear-proyecto')) {
      //   this.router.navigate(['/crear-proyecto']);
      // }
    });

    // Maneja los eventos de cambio de ruta para actualizar el estado de inicio de sesión
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Actualiza el estado de inicio de sesión cuando la ruta cambia
        this.authService.checkLoginStatus();
      }
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

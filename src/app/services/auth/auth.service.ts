
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private username: string | null = null;
  checkLoginStatus: any;
  setLoggedIn: any;

  constructor() {
    // Verificar si localStorage está disponible
    if (typeof localStorage !== 'undefined') {
      // Verificar si hay un usuario autenticado al cargar el servicio
      const storedLoggedIn = localStorage.getItem('isLoggedIn');
      if (storedLoggedIn === 'true') {
        this.loggedIn.next(true);
        this.username = localStorage.getItem('username') || null;
      }
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'SorCas' && password === 'Currupipi') {
      this.loggedIn.next(true);
      this.username = username;
      // Guardar estado de autenticación en el almacenamiento local si está disponible
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.username = null;
    // Limpiar el estado de autenticación del almacenamiento local si está disponible
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  getUsername(): string | null {
    return this.username;
  }
}

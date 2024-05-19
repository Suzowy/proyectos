// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(username: string, password: string): boolean {
    // Aquí deberías validar las credenciales del usuario
    // Si las credenciales son correctas, devuelve true; de lo contrario, devuelve false
    return username === 'usuario' && password === 'contraseña';
  }
}

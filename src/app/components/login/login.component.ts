import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor() { }

  login(username: string, password: string): boolean {
    // Aquí deberías validar las credenciales del usuario
    // Si las credenciales son correctas, devuelve true; de lo contrario, devuelve false
    return username === 'usuario' && password === 'contraseña';
  }
}

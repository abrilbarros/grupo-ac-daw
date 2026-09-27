import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  protected auth = inject(Auth);
  private router = inject(Router);

  nombresRoles = {
    MEDICO: 'Médico',
    PACIENTE: 'Paciente',
    ADMINISTRADOR: 'Administrador'
  };

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
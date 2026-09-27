import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioPrueba, SesionPrueba } from '../models/usuario-prueba';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  sesion = signal<SesionPrueba | null>(null);
  obtenerUsuarios() {
    return this.http.get<{ usuarios: UsuarioPrueba[] }>('/mock-data.json');
  }
  guardarSesion(usuario: UsuarioPrueba) {
    this.sesion.set({
      id: usuario.id,
      nombres: usuario.nombres,
      rol: usuario.rol
    });
  }
  cerrarSesion() {
    this.sesion.set(null);
  }
}
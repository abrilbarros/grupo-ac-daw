import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface UsuarioPrueba {
  id: number;
  documento: string;
  email: string;
  clave: string;
  nombres: string;
  estado: 'ACTIVO' | 'BAJA';
  rol: 'MEDICO' | 'PACIENTE' | 'ADMINISTRADOR';
}
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  mostrarContrasena = false;
  usuario = '';
  contrasena = '';
  mensaje = signal('');
  cargando = signal(false);
  hayError = signal(false);
  iniciarSesion() {
    if (!this.usuario.trim() || !this.contrasena) {
      this.hayError.set(true);
      this.mensaje.set('Completá el documento o email y la contraseña.');
      return;
    }
    if (this.cargando()) {
      return;
    }

    this.hayError.set(false);
    this.cargando.set(true);
    this.mensaje.set('Cargando datos...');

    this.http.get<{ usuarios: UsuarioPrueba[] }>('/mock-data.json')
      .subscribe({
        next: (datos) => {
          this.cargando.set(false);
          const identificador = this.usuario.trim().toLowerCase();

          const usuarioEncontrado = datos.usuarios.find((usuario) =>
            (usuario.documento === identificador ||
              usuario.email.toLowerCase() === identificador) &&
            usuario.clave === this.contrasena
          );

          if (!usuarioEncontrado) {
            this.hayError.set(true);
            this.mensaje.set('Documento, email o contraseña incorrectos.');
            return;
          }

          if (usuarioEncontrado.estado !== 'ACTIVO') {
            this.hayError.set(true);
            this.mensaje.set('Tu usuario está dado de baja.');
            return;
          }

          this.mensaje.set(
            `Bienvenido/a, ${usuarioEncontrado.nombres}. Acceso de prueba correcto.`
          );
        },
        error: () => {
          this.cargando.set(false);
          this.hayError.set(true);
          this.mensaje.set('No se pudieron cargar los datos. Intentá nuevamente.');
        }
      });
  }
}

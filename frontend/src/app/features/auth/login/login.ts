import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  mostrarContrasena = false;
  usuario = '';
  contrasena = '';
  recordarSesion = false;
  mensaje = signal('');
  cargando = signal(false);
  hayError = signal(false);

  limpiarMensaje() {
    this.mensaje.set('');
    this.hayError.set(false);
  }

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

    this.auth.obtenerUsuarios()
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

          this.auth.guardarSesion(usuarioEncontrado);
          this.router.navigate(['/inicio']);
        },
        error: () => {
          this.cargando.set(false);
          this.hayError.set(true);
          this.mensaje.set('No se pudieron cargar los datos. Intentá nuevamente.');
        }
      });
  }
}

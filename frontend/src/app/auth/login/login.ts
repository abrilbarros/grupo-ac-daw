
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { LoginApiClient } from "./login-api-client";
import { AuthStore } from "../auth-store";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { Password } from "primeng/password";
import { InputText } from "primeng/inputtext";

@Component({
    selector: "app-login",
    templateUrl: "./login.html",
    styleUrl: "./login.css",
    imports: [ReactiveFormsModule, InputText, Password, Button]
})
export class Login {

    private readonly messageService: MessageService = inject(MessageService);

    private readonly loginApiClient: LoginApiClient = inject(LoginApiClient);

    private readonly authStore: AuthStore = inject(AuthStore);

    private readonly router: Router = inject(Router);

    form: FormGroup = new FormGroup({
        documento: new FormControl(null, Validators.required),
        clave: new FormControl(null, Validators.required)
    });

    iniciarSesion() {

        if (!this.form.valid) {
            this.form.markAllAsTouched();

            this.messageService.add({
                severity: "error",
                summary: "Completá el documento y la contraseña para ingresar."
            });

            return;
        }

        const documento: string = this.form.value.documento;

        const clave: string = this.form.value.clave;

        this.loginApiClient.iniciarSesion(documento, clave).subscribe({
            next: (res) => {
                this.authStore.guardarToken(res.accessToken);
                this.router.navigateByUrl("/inicio");
            },
            error: (err: HttpErrorResponse) => {
                let mensaje = "No se pudo iniciar sesión. Intentá nuevamente.";

                if (err.status === 401) {
                    mensaje = "Documento o contraseña incorrectos, o usuario inactivo.";
                } else if (err.status === 0) {
                    mensaje = "No se pudo conectar con el servidor. Intentá nuevamente.";
                }

                this.messageService.add({
                    severity: "error",
                    summary: mensaje
                });
            }
        });

    }

}

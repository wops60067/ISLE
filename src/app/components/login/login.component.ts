import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    readonly isSubmitting = signal(false);

    readonly form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder, private readonly loginservice:LoginService,private readonly router: Router) {
        this.form = this.formBuilder.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.form.invalid || this.isSubmitting()) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting.set(true);
        const loginData ={
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.loginservice.login(loginData).subscribe({
            next:(res) =>{
                alert('登入成功！');
                this.isSubmitting.set(false);
                this.router.navigate(['/']);
            },
            error:(err) =>{
                console.error(err)
                alert(err.error || '登入失敗，請稍後再試。');
                this.isSubmitting.set(false);
            }
        })
    }
}



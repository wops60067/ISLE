import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    readonly isSubmitting = signal(false); 

    readonly form: FormGroup;

    constructor(private readonly formBuilder: FormBuilder, private readonly loginservice:LoginService,private readonly router: Router) {
        this.form = this.formBuilder.nonNullable.group({
            firstName: ['', [Validators.required, Validators.minLength(1)]],
            lastName: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if(this.form.invalid){
            this.form.markAllAsTouched();
            return;
        }
        this.isSubmitting.set(true);
        const registerData ={
            userName: `${this.form.value.firstName}${this.form.value.lastName}`,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.loginservice.register(registerData).subscribe({
            next:(res) =>{
                alert('註冊成功！');
                this.isSubmitting.set(false);
                this.router.navigate(['/login']);
            },
            error:(err) =>{
                console.error(err)
                alert(err.error || '註冊失敗，請稍後再試。');
                this.isSubmitting.set(false);
            }
        })
    }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

    constructor(private readonly formBuilder: FormBuilder) {
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
        // 模擬提交；實務上應呼叫認證 API
        setTimeout(() => {
            this.isSubmitting.set(false);
            // TODO: 成功後導向或顯示訊息
            // console.log('Login success', this.form.getRawValue());
        }, 600);
    }
}



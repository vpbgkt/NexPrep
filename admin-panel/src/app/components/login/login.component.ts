import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup; // Initialize in ngOnInit

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize the form after injection
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as { email: string; password: string };

    this.auth.login(email, password).subscribe({
      next: res => {
        alert('Login successful!');
        // store token/role is already handled in AuthService
        // now redirect
        const role = localStorage.getItem('role');
        if (role === 'admin' || role === 'superadmin') {
          this.router.navigate(['/test-series-list']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        // err.error.message comes from your backend
        const msg = err.error?.message || 'Login failed';
        alert(msg);
      }
    });
  }
}
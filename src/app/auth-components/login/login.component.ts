import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('user/dashboard');
      },
      (error) => {
        this.snackbar.open('Bad credentials', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    );
  }
}

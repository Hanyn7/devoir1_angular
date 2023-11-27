import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
})
export class VerificationComponent implements OnInit {
  codeInput: string = '';
  errorMessage: string = '';
  username: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  validateCode() {
   if (this.codeInput.length === 6) {
      const verificationRequest = {
        username: this.username, 
        verificationCode: this.codeInput,

      }; 

      this.authService.handleVerification(verificationRequest).subscribe(
        (response: any) => {
          let jwToken = response.headers.get('Authorization');

          if (jwToken) {
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          } else {
            console.error('No authorization token found.');
            this.errorMessage = 'No authorization token found.';
          }
        },
        (error: any) => {
          this.errorMessage = 'Invalid verification code.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid 6-digit code.';
    }
  }
}

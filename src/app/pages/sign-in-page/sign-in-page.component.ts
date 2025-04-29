import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
   
  register(name:string,email: string, password: string) {
      if(!name || !email || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter all fields',
        });
        return;
      }
  }
}

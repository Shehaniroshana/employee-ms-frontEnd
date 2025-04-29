import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../service/UserService';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  userService: UserService = new UserService();
   
  register(name:string,email: string, password: string) {
      if(!name || !email || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter all fields',
        });
        return;

      }

      this.userService.saveUser(email, password, name).then((result) => {
        if(result===true){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You have registered successfully',
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User already exists',
          });
        }
      });

  }
}

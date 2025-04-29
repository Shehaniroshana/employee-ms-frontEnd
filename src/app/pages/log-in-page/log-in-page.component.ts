import { Component } from '@angular/core';
import { UserService } from '../../service/UserService';
import Swal from 'sweetalert2';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  imports: [RouterLink],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent {
  
  userservice:UserService=new UserService();

  constructor(private router:Router){}

  logIn(emil: string, password: string) {
    if (!emil || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter both email and password',
      });
      return;
    }
    this.userservice.authenticate(emil, password).then((result) => {
      if(result===true){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You have logged in successfully',
        });
        this.router.navigate(['/home']);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid email or password',
        });
      }
    });
  }

}

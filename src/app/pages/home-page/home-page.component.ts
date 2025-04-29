import { Component } from '@angular/core';
import { EmployeeService } from '../../service/EmployeeService';
import { CommonModule } from '@angular/common';
import { UpdateEmployeeForm } from '../../service/UpdateEmployeeForm';
import Swal from 'sweetalert2';
import { AddEmployeeForm } from '../../service/AddemployeeForm';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  employeeService:EmployeeService=new EmployeeService();
  updateEmployee:UpdateEmployeeForm=new UpdateEmployeeForm();
  addEmployeeForm=new AddEmployeeForm();
  employees:any[]=[];

  constructor() {
    
  }

  ngOnInit() {
    this.getAllEmployee();
  }

  async getAllEmployee(){
    this.employees=await this.employeeService.getAllEmployees();
    console.log(this.employees);
  }

  formatDate(dateTime: string): string {
    const [date, time] = dateTime.split('T');
    return `${date}`;
  }

  async editEmployee(employee:any){
    const updated = await this.updateEmployee.openEditForm(employee);
  if (updated) {
    this.getAllEmployee();
  }
  }

 
  async deleteEmployee(id: number) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Delete failed');
        }
  
        Swal.fire('Deleted!', 'Employee deleted successfully.', 'success');
        await this.getAllEmployee(); 
      }
  
    } catch (error) {
      Swal.fire('Error', 'Failed to delete employee.', 'error');
      console.error(error);
    }
  }
  
  async openAddForm(){
   await this.addEmployeeForm.openAddForm();
   await this.getAllEmployee();
  }
}

import { Component } from '@angular/core';
import { EmployeeService } from '../../service/EmployeeService';
import { CommonModule } from '@angular/common';
import { UpdateEmployeeForm } from '../../service/UpdateEmployeeForm';
import Swal from 'sweetalert2';
import { AddEmployeeForm } from '../../service/AddemployeeForm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,FormsModule],
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
   const result=await this.addEmployeeForm.openAddForm();
   if(result){
   await this.getAllEmployee();
   }
  }

  async searchEmployeeByName(name: string) {
    if (name!=='') {
      this.employees = await this.employeeService.searchEmployeeByName(name);
    } else {
      this.getAllEmployee();
    }
  }

  exportToCSV() {
    if (!this.employees || this.employees.length === 0) {
      Swal.fire('No data', 'There are no employees to export.', 'info');
      return;
    }
  
    const header = [
      'ID',
      'Name',
      'Email',
      'Phone Number',
      'Address',
      'Department',
      'Salary',
      'Active',
      'Date'
    ];
  
    const csvContent = [
      header.join(','),
      ...this.employees.map(emp => {
        const dateObj = new Date(emp.createdAt || emp.date || '');
        const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
  
        const row = [
          emp.id,
          `"${emp.name}"`,
          `"${emp.email}"`,
          `"\t${emp.phoneNumber}"`, // prevents scientific notation
          `"${emp.address}"`,
          emp.department,
          emp.salary,
          emp.active ? 'Yes' : 'No',
          `"${formattedDate}"` // date as readable string
        ];
  
        return row.join(',');
      })
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
}

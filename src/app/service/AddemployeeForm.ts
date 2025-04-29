import Swal from 'sweetalert2';
import { EmployeeService } from './EmployeeService';

export class AddEmployeeForm {

  employeeService = new EmployeeService();

  async openAddForm(): Promise<boolean> {
    return Swal.fire({
      title: 'Add New Employee',
      html: `
        <input id="name" class="swal2-input" placeholder="Name">
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="phoneNumber" class="swal2-input" placeholder="Phone Number">
        <input id="address" class="swal2-input" placeholder="Address">
        <input id="salary" class="swal2-input" placeholder="Salary" type="number">
        <select id="department" class="swal2-input">
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="FINANCE">FINANCE</option>
          <option value="OPERATIONS">OPERATIONS</option>
        </select>
        <label style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px;">
          <input type="checkbox" id="isActive" checked/> Active
        </label>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        return {
          name: (document.getElementById('name') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          phoneNumber: (document.getElementById('phoneNumber') as HTMLInputElement).value,
          address: (document.getElementById('address') as HTMLInputElement).value,
          salary: parseFloat((document.getElementById('salary') as HTMLInputElement).value),
          department: (document.getElementById('department') as HTMLSelectElement).value,
          isActive: (document.getElementById('isActive') as HTMLInputElement).checked,
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const success = await this.employeeService.addEmployee(result.value);
        if (success) {
          Swal.fire('Success', 'Employee added successfully!', 'success');
          return true;
        } else {
          Swal.fire('Error', 'Failed to add employee.', 'error');
          return false;
        }
      }
      return false;
    });
  }
}

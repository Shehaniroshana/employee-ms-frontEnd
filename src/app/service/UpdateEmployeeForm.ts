import Swal from 'sweetalert2';
import { EmployeeService } from './EmployeeService';

export class UpdateEmployeeForm {

  employeeService = new EmployeeService();

  async openEditForm(employee: any): Promise<any | null> {
    const result = await Swal.fire({
      title: 'Update Employee',
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${employee.name}">
        <input id="email" class="swal2-input" placeholder="Email" value="${employee.email}">
        <input id="phoneNumber" class="swal2-input" placeholder="Phone Number" value="${employee.phoneNumber}">
        <input id="address" class="swal2-input" placeholder="Address" value="${employee.address}">
        <input id="salary" class="swal2-input" placeholder="Salary" type="number" value="${employee.salary}">

        <select id="department" class="swal2-input">
          <option value="HR" ${employee.department === 'HR' ? 'selected' : ''}>HR</option>
          <option value="IT" ${employee.department === 'IT' ? 'selected' : ''}>IT</option>
          <option value="FINANCE" ${employee.department === 'FINANCE' ? 'selected' : ''}>FINANCE</option>
          <option value="OPERATIONS" ${employee.department === 'OPERATIONS' ? 'selected' : ''}>OPERATIONS</option>
        </select>

        <label style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px;">
          <input type="checkbox" id="isActive" ${employee.isActive ? 'checked' : ''}/> Active
        </label>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const updatedEmployee = {
          ...employee,
          name: (document.getElementById('name') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          phoneNumber: (document.getElementById('phoneNumber') as HTMLInputElement).value,
          address: (document.getElementById('address') as HTMLInputElement).value,
          salary: parseFloat((document.getElementById('salary') as HTMLInputElement).value),
          department: (document.getElementById('department') as HTMLSelectElement).value,
          isActive: (document.getElementById('isActive') as HTMLInputElement).checked
        };
        return updatedEmployee;
      }
    });

    if (result.isConfirmed && result.value) {
      await this.employeeService.updateEmployee(result.value);
      return result.value;
    }

    return null;
  }
}

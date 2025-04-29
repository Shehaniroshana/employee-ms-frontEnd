import Swal from "sweetalert2";
export class EmployeeService {
    
    async getAllEmployees(): Promise<any> {
        try {
            const response = await fetch('http://localhost:8080/api/employees', { method: 'GET' });
            const employees = await response.json();
            return employees;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    }

    async updateEmployee(updatedEmployee: any) {
        try {
          const response = await fetch(`http://localhost:8080/api/employees/${updatedEmployee.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployee)
          });
          if (!response.ok) {
            throw new Error('Update failed');
          }
      
          Swal.fire('Success!', 'Employee updated successfully.', 'success');
          this.getAllEmployees(); 
        } catch (error) {
          Swal.fire('Error', 'Failed to update employee.', 'error');
          console.error(error);
        }
      }
      async addEmployee(employee: any): Promise<boolean> {
        try {
          const response = await fetch('http://localhost:8080/api/employees', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
          });
      
          return response.ok;
        } catch (error) {
          console.error('Error adding employee:', error);
          return false;
        }
      }
      
    async searchEmployeeByName(name: string): Promise<any> {
        const data=await fetch(`http://localhost:8080/api/employees/name/${name}`).then((response) => {
            return response.json();
        });
        return data;
    }
}
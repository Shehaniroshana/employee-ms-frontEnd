
export class UserService {
    constructor() {
    }

    async authenticate(email: string, password: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:8080/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json(); 
            return result; 
        } catch (error) {
            console.error('Error authenticating user:', error);
            return false; 
        }
    }

    async saveUser(email: string, password: string, name: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            return result; 
        } catch (error) {
            console.error('Error saving user:', error);
            return false; 
        }
    }
    
}
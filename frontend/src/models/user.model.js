
export default class UserModel{

    constructor(){
        this.URL_BASE = process.env.URL_BASE;
    }

    async login(email, pwd){
        try {
            const response = await fetch(`${this.URL_BASE}/users/login`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, pwd})
            });

            const result = await response.json();
            if(result.error)
                throw new Error(result.error);

            this.user = result.user;

            localStorage.setItem('token', result.token);

            return null;
            
        } catch (error) {
            return error.message;
        }
    }
}

export default class UserModel{

    constructor(){
        this.URL_BASE = process.env.URL_BASE;
    }

    async setUser(user){
        try {
            const response = await fetch(`${this.URL_BASE}/users/register`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err.message);
            return false;
        }
    }

    async getUser(userId = null){
        try {
            let endpoint = `/dashboard/user/${userId}`;
            const headers = {
                "Content-Type": "application/json"
            };

            if(!userId){
                endpoint = '/dashboard/user';
                const token = localStorage.getItem('token');

                if(!token)
                    throw new Error('No session and no user id');

                headers.token = token;
            }

            const response = await fetch(`${this.URL_BASE}${endpoint}`, {
                method: "GET",
                headers
            });

            const result = await response.json();
            if(result.msg)
                throw new Error(result.msg);

            return result.user;
        } catch (err) {
            console.log(err.message);
            return null;
        }
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
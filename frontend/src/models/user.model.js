
export default class UserModel{

    constructor(){
        this.URL_BASE = process.env.URL_BASE;
    }

    async setImage(image, userId){
        try{
            const formData = new FormData();
            formData.set('avatar', image);
            const response = await fetch(`${this.URL_BASE}/users/avatar/${userId}`,{
                method: 'POST',
                body: formData
            });

            const result = await response.text();
            console.log(result);
        }catch(err){
            console.log(err.message);
            return err.message;
        }
    }

    async update(user){
        try {
            const response = await fetch(`${this.URL_BASE}/users/update`, {
                method: 'POST',
                headers:{
                    "token": localStorage.getItem('token')
                },
                body: user
            });

            const result = await response.json();
            if(result.errors){
                console.log(result);
                throw new Error(result.errors);
            }
            console.log(result);
        } catch ( err ) {
            console.log(err);
            return err;
        }
    }

    async setUser(user){
        try {
            const response = await fetch(`${this.URL_BASE}/users/register`, {
                method: "POST",
                headers:{
                    "token": localStorage.getItem('token')
                },
                body: user
            });

            const result = await response.json();
            console.log(result);
            return result;
        } catch (err) {
            console.log(err.message);
            return err.message;
        }
    }

    async getId(id = null){
        try {
            const response = await fetch(`${this.URL_BASE}/users/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });

            const { user } = await response.json();
            return user.uuid;
        } catch ( err ) {
            console.log(err.message);
            return err.message;
        }
    }

    async findUserById(id = null){
        try {
            const url = id 
                ? `${this.URL_BASE}/users/${id}`
                : `${this.URL_BASE}/users/user`

            console.log(url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });

            const {user} = await response.json();
            return user;
        } catch ( err ) {
            console.log(err.message);
            return err.message;
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

            const { user } = result;
            return user;
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

    async findAllByName(name){
        try {
            const response = await fetch(`${this.URL_BASE}/users/user/${name}`, {
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                }
            });

            const { users } = await response.json();
            return users;
        } catch (_err) {
            console.log(err.message);
            return null;
        }
    }
}
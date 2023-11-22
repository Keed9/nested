export default class DatesModel{
    constructor(){
        this.URL_BASE = process.env.URL_BASE;
    }

    async setDate(data){
        try {
            const response = await fetch(`${this.URL_BASE}/dates/schedule`,{
                method: "POST",
                headers:{
                    'token': localStorage.getItem('token')
                },
                body: data
            });

            const result = await response.json();
            console.log(result);
        } catch (_err) {
            console.log(_err);
            return _err;
        }
    }
}
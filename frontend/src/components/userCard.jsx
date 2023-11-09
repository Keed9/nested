//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/userCard.css';

const login = async (element) => {
element.preventDefault();
    try {
        element.preventDefault();

        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": "keed@gmail.com", "pwd": "123"})
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    
}

export default function UserCard({userName='Mike', userImage}){
    return(
        <div className='card p-3 m-3' style={{"width": "18rem"}}>
            <img 
                className='card-img-top px-3 mb-2 rounded-circle' 
                src={userImage}
                alt="user image" 
                width={210}
                height={210}
            />
            <div className='card-body'>
                <p className='text-center fs-3 text-white'>{userName}</p>
                <form action="">
                    <div className="mb-1">
                        <input 
                            type="password" 
                            name="pwd" 
                            id="pwd" 
                            className="form-control" 
                            placeholder='Password'
                        />
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            value="Sign in" 
                            id="login" 
                            className="form-control w-100"
                            onClick={(e) => login(e)}
                         />
                    </div>
                </form>
            </div>
        </div>
    );
}
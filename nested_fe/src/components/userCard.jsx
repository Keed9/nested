
//import React from 'react';
import '../styles/userCard.css';

export default function UserCard({usrImg, name}){
    return(
        <div className="card">
            <div>
                <img src={usrImg} /> 
            </div>
            <p> {name} </p>
            <form>
                <div>
                    <input 
                        type="password" 
                        placeholder="password" 
                        name="pwd"
                    />
                    <input
                        type="submit"
                        value="Sign in"
                        name="signin"
                    />
                </div>
            </form>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { EditText, SubmitButton } from '../components/inputs.component';
import emailValidator from 'email-validator';
import { useNavigate } from "react-router-dom";

import UserModel from '../models/user.model';

export default function LoginForm() {

    const userModel = new UserModel();

    const navigate = useNavigate();

    const [emailStatus, setEmailStatus] = useState(true);
    const [pwdStatus, setPwdStatus] = useState(true);

    useEffect(() => {
        const verifySession = async() => {
            //VERIFY TOKEN SESSION
            const user = await userModel.getUser();
            console.log(user);
            if(user)
                navigate("/calendar/user.id");
            
        }

        verifySession();

    }, []);

    return (
        <div className='card p-3 m-3' style={{"width": "18rem"}}>
            <div className='card-body'>
                <h3 className="card-title mb-3">Login</h3>
                <form
                on
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const [email, pwd] = document.querySelectorAll('input');
                        const error = await userModel.login(email.value, pwd.value);

                        if(!error)
                            navigate("/calendar");
                        
                        pwd.value = "";
                        setPwdStatus(false);
                    }} 
                >
                    <div className="mb-3">
                        <EditText 
                            type="email"
                            id="email" 
                            placeholder="example@domain.com"
                            status={emailStatus}
                            error="The email is not valid"
                            onBlur={(element) => 
                                setEmailStatus(emailValidator.validate(element.value))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <EditText 
                            type="password"
                            id="pwd"
                            placeholder="Password"
                            status={pwdStatus}
                            error="Password cannot be empty"
                            onBlur={(element) => 
                                setPwdStatus(element.value.length != 0)
                            }
                        />
                    </div>
                    <div>
                        <SubmitButton 
                            value="Sign in"
                            id="signin"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
import { Outlet, useNavigate } from 'react-router-dom';
import UserModel from '../models/user.model';

//COMPONENTS
import Navbar from '../widgets/navbar.widget';
import Toolbar from '../widgets/toolbar.widget';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/dashboard.css';
import { useEffect, useState } from 'react';

export default function Dashboard(){
    const userModel = new UserModel();
    const navigate = useNavigate();
    
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const getUser = async() => {
            try {
                const __user = await userModel.getUser();
                if(Object.keys(__user).length == 0)
                    navigate("/login");

                setUser(__user);
            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        }

        getUser();
        
    }, []);

    return (


        <>
            <Navbar userName={user.name}/>
            <div className="container-fluid vh-100 dashboard">
                <div className="row">
                    <Toolbar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}
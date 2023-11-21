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
                console.log(__user);
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
            <Navbar userName={user.name} avatar={user.avatar} curp={user.curp} id={user.uuid}/>
            <div className="container-fluid dashboard">
                <div className="row">
                    <Toolbar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}
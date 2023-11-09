//COMPONENTS
import UserCard from '../components/userCard';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/loginStyle.css';

//IMAGES
import logo_nested from '../assets/logo_nested.png';
import logo_co from '../assets/logo_co.png';

export default function Login() {

    /*
        LOADING SCREEN

        1.- IF THERE IS A TOKEN VERIFY TOKEN WITH /USERS/LOGIN ENPOINT
            A) IF THE TOKEN IS VALID THEN REDIRECT TO DASHBOARD
            B) IF THE TOKEN IS NOT VALID STAY ON LOADING PAGE

        2.- CHECK LOCAL STORAGE FOR PRECHARGE OTHER USERS
    */

    return (
        <>
            <div className="container-fluid vh-100 p-0 login">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a href="/login" className="navbar-brand">
                            <img src={logo_nested} alt="Nested logo" />
                        </a>
                    </div>
                </nav>
                <div className="col-lg-12 p-3">
                    <div className="row justify-content-center">
                        <UserCard userName="Jhon Doe" userImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"/>
                        <UserCard userName="Britney spears" userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"/>
                    </div>
                </div>
                <div className="col-lg-12 d-flex justify-content-end p-2">
                    <img src={logo_co} alt="Logo company" />
                </div>
            </div>
        </>
    );
}
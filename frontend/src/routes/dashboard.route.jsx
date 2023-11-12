import { Outlet } from 'react-router-dom';

//COMPONENTS
import Navbar from '../widgets/navbar.widget';
import Toolbar from '../widgets/toolbar.widget';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/dashboard.css';

export default function Dashboard(){
    return (
        <>
            <Navbar />
            <div className="container-fluid vh-100 dashboard">
                <div className="row">
                    <Toolbar />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
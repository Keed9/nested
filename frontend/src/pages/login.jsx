import 'bootstrap/dist/css/bootstrap.css';
import logoNested from '../assets/logo_nested.png'

export default function Login(){
    return (
        <nav className="navbar bg-primary">
            <div className="container-fluid">
                <a href="./login" className="navbar-brand">
                    <img src={logoNested} alt="" />
                </a>
            </div>
        </nav>
    );
}
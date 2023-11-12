//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

//IMAGES
import logo_nested from '../assets/logo_nested.png';
import searchIcon from '../assets/search.svg';

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg">
            <a href="/" className="navbar-brand">
                <img src={logo_nested} alt="Nested logo" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex w-75 position-relative" role="search">
                    <input className="form-control mx-2 searchbar" type="search" />
                    <button type="submit" className='position-absolute'>
                        <img src={searchIcon} width={24} height={24} alt="" />
                    </button>
                </form>
                <div className="d-flex justify-content-center w-25 user-card">
                    <p className='text-center mx-2 align-self-center mt-2'>
                        {"Jhon Doe"}
                    </p>
                    <img className="rounded-circle mx-3" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </div>
            </div>
        </nav>
    );
}
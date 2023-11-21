//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

//IMAGES
import logo_nested from '../assets/logo_nested.png';
import searchIcon from '../assets/search.svg';
import { useNavigate } from 'react-router-dom';
import UserModel from '../models/user.model';
import UserStrip from '../components/userStrip.component';
import { useState } from 'react';

export default function Navbar({userName, avatar, curp, id}){

    const navigate = useNavigate();
    const userModel = new UserModel();

    const [users, setUsers] = useState([]);

    return(
        <nav className="navbar navbar-expand-lg">
            <a href="/" className="navbar-brand">
                <img 
                    src={logo_nested} alt="Nested logo" 
                />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex w-75 position-relative" role="search">
                    <input 
                        className="form-control mx-2 searchbar" 
                        type="search" 
                        onChange={async (e) => {
                            const name = e.target.value;
                            if(name.length <= 0 ){
                                setUsers([])
                            }else{
                                const users = await userModel.findAllByName(name);
                                setUsers(users);
                            }
                            //console.log(`Buscado a: ${value}`)
                        }}
                    />
                    <button type="submit" className='position-absolute'>
                        <img src={searchIcon} width={24} height={24} alt="" />
                    </button>
                    <div className={users.length > 0 ? "search-box position-absolute w-100 p-1 rounded" : "search-box position-absolute w-100 p-1 rounded d-none"}>
                        <div className="container" onClick={() => setUsers([])}>
                            {users.map( 
                                user => 
                                    <UserStrip 
                                        avatar={`${process.env.URL_BASE}/${user.avatar}`} 
                                        userName={user.name} 
                                        curp={user.curp} 
                                        id={user.uuid} 
                            />)}
                        </div>
                    </div>
                </form>
                <div className="d-flex justify-content-center w-25 user-card">
                    <p className='text-center mx-2 align-self-center mt-2'>
                        {userName}
                    </p>
                    <img 
                        className="rounded-circle mx-3" 
                        src={`${process.env.URL_BASE}/${avatar}`} 
                        alt="" 
                        onClick={async (e) => {
                            //const id = await userModel.getId();
                            navigate(`/update/${id}`);
                        }}
                    />
                </div>
            </div>
        </nav>
    );
}
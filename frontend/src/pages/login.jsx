import { useDebugValue, useState, useEffect } from 'react';
import { redirect, resolvePath } from "react-router-dom";

//COMPONENTS
import LoginForm from '../widgets/login.widget';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/login.css';

//IMAGES
import logo_nested from '../assets/logo_nested.png';

export default function Login() {
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
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
}
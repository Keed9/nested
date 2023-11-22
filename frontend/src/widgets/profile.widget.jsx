import { useEffect } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import UserModel from "../models/user.model";

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/profile.css';

export default function Profile(){

    const {id} = useParams();
    const user = useRouteLoaderData("profile");

    return(
        <div className="col rounded profile-head">
            <div className="col-12 my-1 mt-1 p-3 d-flex rounded">
                <img 
                    className="rounded-circle"
                    src={`${process.env.URL_BASE}/${user.avatar}`} 
                    alt="" 
                />
                <div className="align-self-end mx-4">
                    <h1 className="">{user.name}</h1>
                    <small>{user.curp}</small>
                </div>
            </div>
            <div className="col-4 my-1 p-3 rounded profile-info">
                <h2>Personal info</h2>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Curp:</b> {user.curp}</p>
                <p><b>Phone:</b> {user.phone}</p>
                <p><b>Address:</b> {`${user.avenue} #${user.extNumber} ${user.city} ${user.state} ${user.country}`}</p>
            </div>
            <div className="col my-1 p-3 rounded profile-dates">
                <h2>Citas previas</h2>
            </div>
        </div>
    );
}
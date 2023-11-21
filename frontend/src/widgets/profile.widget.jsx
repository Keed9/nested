import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserModel from "../models/user.model";


export default function Profile(){

    const {id} = useParams();
    useEffect(() => {
        const loadUser = async()=> {
            const userModel = new UserModel();
            const user = await userModel.findUserById(id)
            console.log(user);
        }

        loadUser();
    },[])

    return(
        <div className="col rounded profile">
            <h1>{`Perfil del usuario: ${id}`}</h1>
        </div>
    );
}
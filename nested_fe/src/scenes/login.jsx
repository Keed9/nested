import Head from '../components/login_head';
import UserCard from '../components/userCard';
import '../styles/login.css';

/*
 * RECIBO UNA LISTA DE USUARIOS GUARDADOS EN LAS COOKIES
 * OSEA SE UNA LISTA DE USER CARDS
 */

export default function Login(){
   return(
        <div id="Login">
            <Head />
            <div className="cards">
                <UserCard
                    usrImg="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    name="Jhon Doe"
                />
                <UserCard
                    usrImg="https://media.istockphoto.com/id/1170564027/photo/young-man-closed-eyes-dreaming-isolated-on-grey-studio-background.jpg?s=612x612&w=0&k=20&c=sPBezkOOzVAg63qTw1TbUtSCUM5G3Qb5sFmn2Y3cpnQ="
                    name="Mike Med"
                />
                <UserCard
                    usrImg="https://media.istockphoto.com/id/1205252287/photo/upset-young-casual-guy-crossing-arms-on-grey-background.jpg?s=170667a&w=0&k=20&c=B3EWln3_PpRQSGQhcIL-tIh45u4b6mN5T7FRAS_ILwQ="
                    name="Mike Med"
                />
            </div>
        </div>
   );
}

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/userStrip.css';
import { useNavigate } from 'react-router-dom';

export default function UserStrip({avatar, userName, id, curp}){

    const navigate = useNavigate();

    return(
        <div 
            className="d-flex justify-content-start my-2 pb-2 user-strip rounded py-2"
            onClick={(e) => {
                navigate(`/user/${id}`);
            }}
        >
            <img 
                className="rounded-circle mx-3" 
                rc={`${process.env.URL_BASE}/${avatar}`} 
                alt=""
            />
            <p className='text-center mx-2 align-self-center mt-2'>
                {userName}
            </p>
            <small className='align-self-center mx-2'>{curp}</small>
        </div>
    );
}
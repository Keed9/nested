import { Link } from 'react-router-dom';

//IMAGES
import calendarIcon from '../assets/calendar.svg';
import ScheduleIcon from '../assets/calendar-plus.svg';
import personAddIcon from '../assets/person-add.svg';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/toolbar.css';

export default function Toolbar(){

    const linkSyle = {
        "textDecoration": "none", 
        "textAlign": "center"
    };

    return(
        <div className="col-1 rounded toolbar">
            <div className="row pt-5">
                <Link style={linkSyle} to={"/calendar"}>
                    <img width={36} height={36} src={calendarIcon} alt="" />
                    <p>Calendar</p>
                </Link>
            </div>
            <div className="row pt-3">
                <Link style={linkSyle} to={""}>
                    <img width={36} height={36} src={ScheduleIcon} alt="" />
                    <p>Schedule</p>
                </Link>
            </div>
            <div className="row pt-3">
                <Link style={linkSyle} to={"/register"}>
                    <img width={36} height={36} src={personAddIcon} alt="" />
                    <p>Register</p>
                </Link>
            </div>
        </div>
    );
}
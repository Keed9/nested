
//IMAGES
import calendarIcon from '../assets/calendar.svg';
import ScheduleIcon from '../assets/calendar-plus.svg';
import personAddIcon from '../assets/person-add.svg';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/toolbar.css';

export default function Toolbar(){
    return(
        <div className="col-1 rounded toolbar">
            <div className="row pt-5">
                <img width={36} height={36} src={calendarIcon} alt="" />
                <p>Calendar</p>
            </div>
            <div className="row pt-3">
                <img width={36} height={36} src={ScheduleIcon} alt="" />
                <p>Schedule</p>
            </div>
            <div className="row pt-3">
                <img width={36} height={36} src={personAddIcon} alt="" />
                <p>Register</p>
            </div>
        </div>
    );
}
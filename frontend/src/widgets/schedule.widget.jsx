import DatesModel from '../models/date.model';

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/schedule.css';

export default function Schedule(){
    return(
        <div className="col rounded schedule p-3">
            <h1>Schedule</h1>
            <form id="schedule">
                <div className="row">
                    <div className="col-2 my-2">
                        <label className="form-label">Date</label>
                        <input type="date" name='date' id='date' className="form-control"/>
                    </div>
                    <div className="col-2 my-2">
                        <label className="form-label">Hour</label>
                        <input type="number" name="hour" id="hour" className="form-control" />
                    </div>
                    <div className="col-4 my-2">
                        <label className="form-label">Patient</label>
                        <input className="form-control edit-text" type="search" name="patient" id="patient" />
                    </div>
                    <div className="col-4 my-2">
                        <label className="form-label">Comments</label>
                        <textarea name="comment" id="comments" className='form-control edit-text'></textarea>
                    </div>
                    <div className="col my-2">
                        <input 
                            className='form-control my-2' 
                            type="submit" 
                            value="Schedule a date" 
                            onClick={async (e)=> {
                                e.preventDefault();

                                const form = document.getElementById("schedule");
                                const formData = new FormData(form);

                                for (let [clave, valor] of formData.entries()) {
                                    console.log(`${clave}: ${valor}`);
                                  }

                                const datesModel = new DatesModel();
                                await datesModel.setDate(formData);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
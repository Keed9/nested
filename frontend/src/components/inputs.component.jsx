
//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/inputs.css';

function EditText ({type, id, placeholder, status = true, onKeyUp, onBlur, error}){
    return(
        <>
            <input 
                type={type}
                name={id} 
                id={id}
                className={`form-control ${status ? "edit-text" : "edit-text-error"}`} 
                placeholder={placeholder}
                onKeyUp={ e => onKeyUp ? onKeyUp(e.target) : "No keyup action"}
                onBlur={ e => onBlur(e.target)}
                status={status}
            />
            <small className={status ? "d-none" : "d-block"}>{error}</small>
        </>
    );
}

function SubmitButton({value, id, action = null}){
    return(
        <input 
            type="submit" 
            value={value} 
            id={id}
            className="form-control w-100"
            onClick={(e) => action ? action(e) : "No action seted"}
        /> 
    );
}

function ComboBox({id, status = true, error, options = []}){
    return(
        <>
            <select 
                className='form-control edit-text' 
                id={id}
                name={id}
            >
                {options.map( option =>
                    <option value={option.value}>
                        {option.text}
                    </option>
                )}
            </select>
            <small className={status ? "d-none" : "d-block"}>{error}</small>
        </>
    );
}

export {
    EditText,
    SubmitButton,
    ComboBox
}
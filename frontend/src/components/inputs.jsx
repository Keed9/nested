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

export {
    EditText,
    SubmitButton
}

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/inputs.css';
import { useState } from 'react';

function EditText ({_type, _id, _placeholder, _status = true, _onKeyUp, _onBlur, _error, _value = false}){

    const [value, setValue] = useState(_value || '');

    return(
        <>
            <input 
                type={_type}
                name={_id} 
                id={_id}
                className={`form-control ${_status ? "edit-text" : "edit-text-error"}`} 
                placeholder={_placeholder}
                onKeyUp={ e => _onKeyUp ? onKeyUp(e.target) : "No keyup action"}
                onBlur={ e => _onBlur(e.target)}
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <small className={_status ? "d-none" : "d-block"}>{_error}</small>
        </>
    );
}

function SubmitButton({_value, _id, _action = null}){
    return(
        <input 
            type="submit" 
            value={_value} 
            id={_id}
            className="form-control w-100"
            onClick={(e) => _action ? _action(e) : "No action seted"}
        /> 
    );
}

function ComboBox({_id, _status = true, _error, _options = []}){
    return(
        <>
            <select 
                className='form-control edit-text' 
                id={_id}
                name={_id}
            >
                {_options.map( option =>
                    <option value={option.value} id={option.value}>
                        {option.text}
                    </option>
                )}
            </select>
            <small className={_status ? "d-none" : "d-block"}>{_error}</small>
        </>
    );
}

export {
    EditText,
    SubmitButton,
    ComboBox
}
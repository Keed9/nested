import { EditText, ComboBox, SubmitButton } from "../components/inputs.component";
import UserModel from "../models/user.model";
import { validate } from '../helpers/valids.helper';
import { useState, useEffect } from "react";
import emailValidator from 'email-validator';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/register.css';

//IMAGES
import userPlaceholderImg from '../assets/user_placeholder.png';

export default function UpdateUser(){

    const [fNameStatus, setFNameStatus] = useState(true);
    const [lNameStatus, setLNameStatus] = useState(true);
    const [emailStatus, setEmailStatus] = useState(true);
    const [pwdStatus, setPwdStatus] = useState(true);
    const [curpStatus, setCurpStatus] = useState(true);
    const [phoneStatus, setPhoneStatus] = useState(true);
    const [avenueStatus, setAvenueStatus] = useState(true);
    const [extNumberStatus, setExtNumberStatus] = useState(true);
    const [cityStatus, setCityStatus] = useState(true);
    const [stateStatus, setStateStatus] = useState(true);
    const [countryStatus, setCountryStatus] = useState(true);

    const [avatarImage, setAvatarImage] = useState(null);

    const [fName_v, setFname] = useState('');
    const [lName_v, setLname] = useState('');
    const [email_v, setEmail] = useState('');
    const [pwd_v, setPwd] = useState('');
    const [phone_v, setPhone] = useState('');
    const [curp_v, setCurp] = useState('');
    const [avenue_v, setAvenue] = useState('');
    const [extNumber_v, setExtNumber] = useState('');
    const [city_v, setCity] = useState('');
    const [state_v, setState] = useState('');
    const [country_v, setCountry] = useState('');

    const navigate = useNavigate();

    
    useEffect(() => {
        const loadUser = async () => {
            const userModel = new UserModel();
            const _user = await userModel.getUser();
            setFname(_user.fName);
            setLname(_user.lName);
            setEmail(_user.email);
            setPwd(_user.pwd);
            setPhone(_user.phone);
            setCurp(_user.curp);
            setAvenue(_user.avenue);
            setExtNumber(_user.extNumber);
            setState(_user.state);
            setCity(_user.city);
            setCountry(_user.country);
            setAvatarImage(`${process.env.URL_BASE}/${_user.avatar}`);
        }
        
        loadUser();
    }, []);

    const isValid = (inputs) => {
        const result = [...inputs].find(input => input.className.includes('edit-text-error') || input.value === '');
        if((result && result.id) == 'avatar')
            return false;
        

        return result;
    }


    return(
       <div className="col rounded register">
            <form id="update">
                <div className="row p-5" id="register">
                    <div className="col-4 my-3">
                        <img 
                            height={264} 
                            width={264} 
                            src={avatarImage || userPlaceholderImg} 
                            alt="User image placeholder" 
                            className="border thumbnail rounded"
                        />
                    </div>
                    <div className="col-8 my-3">
                        <div className="row">
                            <div className="col-6 my-3">
                                {/* INPUT NAME */}
                                <input 
                                    type="text" 
                                    name="fName"
                                    id="fName"
                                    className={`form-control ${fNameStatus ? "edit-text" : "edit-text-error"}`}
                                    placeholder="First Name"
                                    onBlur={(element) => 
                                        setFNameStatus(validate(element.target.value, 'justLetters'))}
                                    value={fName_v} 
                                    onChange={(e) => {
                                        setFname(e.target.value);
                                    }}
                                />
                                <small className={fNameStatus ? "d-none" : "d-block"}>
                                    The name must have only letters
                                </small>
                            </div>
                            <div className="col-6 my-3">
                                 {/* INPUT LAST NAME */}
                                <input 
                                    type="text" 
                                    name="lName"
                                    id="lName"
                                    className={`form-control ${lNameStatus ? "edit-text" : "edit-text-error"}`}
                                    placeholder="Last Name"
                                    onBlur={(element) => 
                                        setLNameStatus(validate(element.target.value, 'justLetters'))}
                                    value={lName_v} 
                                    onChange={(e) => {
                                        setLname(e.target.value);
                                    }}
                                />
                                <small className={lNameStatus ? "d-none" : "d-block"}>
                                    The last name must have only letters
                                </small>
                            </div>
                            <div className="col-12 my-3">
                                {/* INPUT EMAIL */}
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    className={`form-control ${emailStatus ? "edit-text" : "edit-text-error"}`}
                                    placeholder="example@domain.com"
                                    onBlur={(element) => 
                                        setEmailStatus(emailValidator.validate(element.target.value))}
                                    value={email_v} 
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <small className={emailStatus ? "d-none" : "d-block"}>
                                    Email not valid
                                </small>
                            </div>
                            <div className="col-12 my-3">
                                {/* INPUT PASSWORD */}
                                <input 
                                    type="password" 
                                    name="pwd"
                                    id="pwd"
                                    className={`form-control ${pwdStatus ? "edit-text" : "edit-text-error"}`}
                                    placeholder="Password"
                                    onBlur={(element) => 
                                        setPwdStatus(validate(element.target.value, "pwd"))}
                                    value={pwd_v} 
                                    onChange={(e) => {
                                        setPwd(e.target.value);
                                    }}
                                />
                                <small className={pwdStatus ? "d-none" : "d-block"}>
                                    Password must have at least one special character, letters, numbers and must be eight characters long
                                </small>
                            </div>
                            <div className="col-12 my-3">
                                {/* INPUT AVATAR */}
                                <input 
                                    type="file" 
                                    name="avatar" 
                                    id="avatar" 
                                    className="form-control" 
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if(file){
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                setAvatarImage(reader.result)
                                            }

                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-3">
                        {/* INPUT PHONE */}
                        <input 
                            type="text" 
                            name="phone"
                            id="phone"
                            className={`form-control ${phoneStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="Phone number"
                            onBlur={(element) => 
                                setPhoneStatus(validate(element.target.value, "phone"))}
                            value={phone_v}
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                        <small className={phoneStatus ? "d-none" : "d-block"}>
                            Phone must includes only numbers and has to be eight charactars long
                        </small>
                    </div>
                    <div className="col-4 my-3">
                         {/* INPUT CURP */}
                        <input 
                            type="text" 
                            name="curp"
                            id="curp"
                            className={`form-control ${curpStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="Curp"
                            onBlur={(element) => 
                                setCurpStatus(validate(element.target.value, "curp"))}
                            value={curp_v}
                            onChange={(e) => setCurp(e.target.value)}
                        />
                        <small className={curpStatus ? "d-none" : "d-block"}>
                            Curp not valid
                        </small>
                    </div>
                    {/* <div className="col-4 my-3">
                        <ComboBox
                            _id="utype"
                            _options={[
                                {
                                    value: "P",
                                    text: "Patient"
                                },
                                {
                                    value: "U",
                                    text: "User"
                                },
                                {
                                    value: "A",
                                    text: "Admin"
                                },
                            ]}
                        />
                    </div> */}
                    <div className="col-8 my-3">
                        {/* INPUT AVENUE */}
                        <input 
                            type="text" 
                            name="avenue"
                            id="avenue"
                            className={`form-control ${avenueStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="Avenue"
                            onBlur={(element) => 
                                setAvenueStatus(element.target.value.length > 0)}
                            value={avenue_v} 
                            onChange={(e) => setAvenue(e.target.value)}
                        />
                        <small className={avenueStatus ? "d-none" : "d-block"}>
                            The avenue cannot be empty
                        </small>
                    </div>
                    <div className="col-2 my-3">
                        {/* INPUT EXT NUMNBER */}
                        <input 
                            type="text" 
                            name="extNumber"
                            id="extNumber"
                            className={`form-control ${avenueStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="Ext Number"
                            onBlur={(element) => 
                                setExtNumberStatus(element.target.value > 0)}
                            value={extNumber_v} 
                            onChange={(e) => setExtNumber(e.target.value)}
                        />
                        <small className={extNumberStatus ? "d-none" : "d-block"}>
                            Exterior number cannot be empty
                        </small>
                    </div>
                    <div className="col-4 my-3">
                        {/* INPUT CITY */}
                        <input 
                            type="text" 
                            name="city"
                            id="city"
                            className={`form-control ${cityStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="City"
                            onBlur={(element) => 
                                setCityStatus(validate(element.target.value, "justLetters"))}
                            value={city_v}
                            onChange={(e) => setCity(e.target.value)} 
                        />
                        <small className={cityStatus ? "d-none" : "d-block"}>
                            City must have just letters
                        </small>
                    </div>
                    <div className="col-4 my-3">
                        {/* INPUT STATE */}
                        <input 
                            type="text" 
                            name="state"
                            id="state"
                            className={`form-control ${stateStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="State"
                            onBlur={(element) => 
                                setStateStatus(validate(element.target.value, "justLetters"))}
                            value={state_v}
                            onChange={(e) => setState(e.target.value)} 
                        />
                        <small className={stateStatus ? "d-none" : "d-block"}>
                            State must have just letters
                        </small>
                    </div>
                    <div className="col-4 my-3">
                        {/* INPUT COUNTRY */}
                        <input 
                            type="text" 
                            name="country"
                            id="country"
                            className={`form-control ${countryStatus ? "edit-text" : "edit-text-error"}`}
                            placeholder="Country"
                            onBlur={(element) => 
                                setCountryStatus(validate(element.target.value, "justLetters"))}
                            value={country_v}
                            onChange={(e) => setCountry(e.target.value)} 
                        />
                        <small className={countryStatus ? "d-none" : "d-block"}>
                            Country must have just letters
                        </small>
                    </div>
                    <div className="col-12 my-1">
                        <SubmitButton
                            _value="Update"
                            _action={async (e) => {
                                e.preventDefault();

                                const form = document.getElementById('update');
                                const inputs = document.querySelectorAll('#update input');
                                const inputFile = document.querySelector('input#avatar');

                                const formData = new FormData(form);
                                const avatar = inputFile.files[0];
                                formData.delete('avatar');

                                !avatar
                                    ? formData.append('avatar', '')
                                    : formData.append('avatar', avatar);


                                if(isValid(inputs)){
                                    alert('Something is wrong or missing, please verify');
                                    return;
                                }

                                const userModel = new UserModel();
                                const result = await userModel.update(formData);

                                //navigate("/calendar")
                            }}
                        />
                    </div>
                </div>
            </form>
       </div>
    );
}
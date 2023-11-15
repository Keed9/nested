import { EditText, ComboBox, SubmitButton } from "../components/inputs.component";
import UserModel from "../models/user.model";
import { validate } from '../helpers/valids.helper';
import { useState } from "react";
import emailValidator from 'email-validator';
import { useNavigate } from "react-router-dom";

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/register.css';

export default function Register(){

    const isValid = {
        "fNameStatus": false,
        "lNameStatus": false,
        "emailStatus": false,
        "pwdStatus": false,
        "curpStatus": false,
        "phoneStatus": false,
        "avenueStatus": false,
        "extNumberStatus": false,
        "cityStatus": false,
        "stateStatus": false,
        "countryStatus": false
    }

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

    const navigate = useNavigate();



    return(
        <div className="col rounded register">
            <div className="row p-5" id="register">
                <div className="col-6 my-3">
                    <EditText
                        type="text"
                        id="fName"
                        placeholder="First name"
                        onBlur={(element) => {
                                setFNameStatus(validate(element.value, 'justLetters'))
                                isValid.fNameStatus = fNameStatus;
                            }
                        }
                        error="The name must have only letters"
                        status={fNameStatus}
                    />
                </div>
                <div className="col-6 my-3">
                    <EditText
                        type="text"
                        id="lName"
                        placeholder="Last name"
                        onBlur={(element) => {
                                setLNameStatus(validate(element.value, 'justLetters'))
                                isValid.lNameStatus = lNameStatus;
                            }
                        }
                        error="The last name must have only letters"
                        status={lNameStatus}
                    />
                </div>
                <div className="col-6 my-3">
                    <EditText
                        type="email"
                        id="email"
                        placeholder="email@example.com"
                        onBlur={(element) => {
                                setEmailStatus(emailValidator.validate(element.value))
                                isValid.emailStatus = emailStatus
                            }
                        }
                        error="Email not valid"
                        status={emailStatus}
                    />
                </div>
                <div className="col-6 my-3">
                    <EditText
                        type="pwd"
                        id="pwd"
                        placeholder="Password"
                        onBlur={(element) => {
                                setPwdStatus(validate(element.value, "pwd"));
                                isValid.pwdStatus = pwdStatus
                            }
                        }
                        error="Password must have at least one special character, letters, numbers and must be eight characters long"
                        status={pwdStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <EditText
                        type="text"
                        id="phone"
                        placeholder="Phone"
                        onBlur={(element) => {
                                setPhoneStatus(validate(element.value, "phone"))
                                isValid.phoneStatus = phoneStatus
                            }
                        }
                        error="Phone not valid"
                        status={phoneStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <EditText
                        type="text"
                        id="curp"
                        placeholder="Curp"
                        onBlur={(element) => {
                                setCurpStatus(validate(element.value, "curp"))
                                isValid.curpStatus = curpStatus
                            }
                        }
                        error="Curp not valid"
                        status={curpStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <ComboBox
                        id="utype"
                        options={[
                            {
                                value: "U",
                                text: "User"
                            },
                            {
                                value: "A",
                                text: "Admin"
                            }
                        ]}
                    />
                </div>
                <div className="col-8 my-3">
                    <EditText
                        type="text"
                        id="avenue"
                        placeholder="Avenue"
                        onBlur={(element) => {
                                setAvenueStatus(element.value.length > 0);
                                isValid.avenueStatus = avenueStatus;
                            }
                        }
                        error="Avenue cannot be empty"
                        status={avenueStatus}
                    />
                </div>
                <div className="col-2 my-3">
                    <EditText
                        type="text"
                        id="extNumber"
                        placeholder="Ext num"
                        onBlur={(element) => {
                                setExtNumberStatus(element.value > 0)
                                isValid.extNumberStatus = extNumberStatus
                            }
                        }
                        error="Exterior number cannot be null"
                        status={extNumberStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <EditText
                        type="text"
                        id="city"
                        placeholder="City"
                        onBlur={(element) => {
                                setCityStatus(validate(element.value, "justLetters"))
                                isValid.cityStatus = cityStatus
                            }
                        }
                        error="City must have just letters"
                        status={cityStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <EditText
                        type="text"
                        id="state"
                        placeholder="State"
                        onBlur={(element) => {
                                setStateStatus(validate(element.value, "justLetters"))
                                isValid.stateStatus = stateStatus;
                            }
                        }
                        error="State must have only numbers"
                        status={stateStatus}
                    />
                </div>
                <div className="col-4 my-3">
                    <EditText
                        type="text"
                        id="country"
                        placeholder="country"
                        onBlur={(element) => {
                                setCountryStatus(validate(element.value, "justLetters"))
                                isValid.countryStatus = countryStatus;
                            }
                        }
                        error="State must have only numbers"
                        status={countryStatus}
                    />
                </div>
                <div className="col-12 my-1">
                    <SubmitButton
                        value="Register"
                        action={async (e) => {
                            const inputs = document.querySelectorAll('#register input');
                            const select = document.querySelector('select');
                            const values = {
                                utype: select.selectedOptions.item(0).value
                            };
                            inputs.forEach( input => 
                                values[input.id] = input.value
                            );

                            if(Object.values(isValid).map( value => value).includes(false)){
                                alert('Please check your info something is missing or is not valid')
                                return;
                            }

                            const userModel = new UserModel();
                            await userModel.setUser(values);

                            inputs.forEach( input => input.value = "");
                            Object.keys(isValid).forEach( key => isValid[key] = false);

                            navigate("/calendar")

                        }}
                    />
                </div>
            </div>
        </div>
    );
}
import { EditText, ComboBox, SubmitButton } from "../components/inputs.component";
import UserModel from "../models/user.model";
import { validate } from '../helpers/valids.helper';
import { useState, useEffect } from "react";
import emailValidator from 'email-validator';
import { useNavigate, useParams } from "react-router-dom";

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/register.css';

//IMAGES
import userPlaceholderImg from '../assets/user_placeholder.png';

export default function Register(){

    const [fNameStatus, setFNameStatus] = useState(true);
    const [lNameStatus, setLNameStatus] = useState(true);
    const [emailStatus, setEmailStatus] = useState(true);
    const [curpStatus, setCurpStatus] = useState(true);
    const [phoneStatus, setPhoneStatus] = useState(true);
    const [avenueStatus, setAvenueStatus] = useState(true);
    const [extNumberStatus, setExtNumberStatus] = useState(true);
    const [cityStatus, setCityStatus] = useState(true);
    const [stateStatus, setStateStatus] = useState(true);
    const [countryStatus, setCountryStatus] = useState(true);

    const [avatarImage, setAvatarImage] = useState(null);

    const navigate = useNavigate();

    const isValid = (inputs) => {
        return [...inputs].find(input => input.className.includes('edit-text-error') || input.value === '');
    }

    return(
        <div className="col rounded register">
            <form id="register">
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
                                <EditText
                                _type="text"
                                _id="fName"
                                _placeholder="First name"
                                _onBlur={(element) => {
                                        setFNameStatus(validate(element.value, 'justLetters'))
                                    }
                                }
                                _error="The name must have only letters"
                                _status={fNameStatus}
                                />
                            </div>
                            <div className="col-6 my-3">
                                <EditText
                                    _type="text"
                                    _id="lName"
                                    _placeholder="Last name"
                                    _onBlur={(element) => {
                                            setLNameStatus(validate(element.value, 'justLetters'))
                                        }
                                    }
                                    _error="The last name must have only letters"
                                    _status={lNameStatus}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <EditText
                                    _type="email"
                                    _id="email"
                                    _placeholder="email@example.com"
                                    _onBlur={(element) => {
                                            setEmailStatus(emailValidator.validate(element.value))
                                        }
                                    }
                                    _error="Email not valid"
                                    _status={emailStatus}
                                />
                            </div>
                            <div className="col-12 my-3">
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
                        <EditText
                            _type="text"
                            _id="phone"
                            _placeholder="Phone"
                            _onBlur={(element) => {
                                    setPhoneStatus(validate(element.value, "phone"))
                                }
                            }
                            _error="Phone not valid"
                            _status={phoneStatus}
                        />
                    </div>
                    <div className="col-4 my-3">
                        <EditText
                            _type="text"
                            _id="curp"
                            _placeholder="Curp"
                            _onBlur={(element) => {
                                    setCurpStatus(validate(element.value, "curp"))
                                }
                            }
                            _error="Curp not valid"
                            _status={curpStatus}
                        />
                    </div>
                    <div className="col-4 my-3">
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
                    </div>
                    <div className="col-8 my-3">
                        <EditText
                            _type="text"
                            _id="avenue"
                            _placeholder="Avenue"
                            _onBlur={(element) => {
                                    setAvenueStatus(element.value.length > 0);
                                }
                            }
                            _error="Avenue cannot be empty"
                            _status={avenueStatus}
                        />
                    </div>
                    <div className="col-2 my-3">
                        <EditText
                            _type="text"
                            _id="extNumber"
                            _placeholder="Ext num"
                            _onBlur={(element) => {
                                    setExtNumberStatus(element.value > 0)
                                }
                            }
                            _error="Exterior number cannot be null"
                            _status={extNumberStatus}
                        />
                    </div>
                    <div className="col-4 my-3">
                        <EditText
                            _type="text"
                            _id="city"
                            _placeholder="City"
                            _onBlur={(element) => {
                                    setCityStatus(validate(element.value, "justLetters"))
                                }
                            }
                            _error="City must have just letters"
                            _status={cityStatus}
                        />
                    </div>
                    <div className="col-4 my-3">
                        <EditText
                            _type="text"
                            _id="state"
                            _placeholder="State"
                            _onBlur={(element) => {
                                    setStateStatus(validate(element.value, "justLetters"))
                                }
                            }
                            _error="State must have only numbers"
                            _status={stateStatus}
                        />
                    </div>
                    <div className="col-4 my-3">
                        <EditText
                            _type="text"
                            _id="country"
                            _placeholder="country"
                            _onBlur={(element) => {
                                    setCountryStatus(validate(element.value, "justLetters"))
                                }
                            }
                            _error="State must have only numbers"
                            _status={countryStatus}
                        />
                    </div>
                    <div className="col-12 my-1">
                        <SubmitButton
                            _value="Register"
                            _action={async (e) => {
                                e.preventDefault();
                                const form = document.getElementById('register');
                                const inputFile = document.querySelector('input#avatar');
                                const inputs = document.querySelectorAll('#register input');
                                const avatar = inputFile.files[0];

                                const formData = new FormData(form);
                                formData.append('pwd', 'ChangeMe123!!');
                                formData.delete('avatar');

                                if(!avatar){
                                    alert('Must choise an user image');
                                    return;
                                }

                                formData.append('avatar', avatar);

                                // const blobImage = new Blob([avatar], {type: avatar.type});
                                // console.log(blobImage);
                                
                                if(isValid(inputs)){
                                    alert('Something is wrong or missing, please verify');
                                    return;
                                }
                                
                                /* const select = document.querySelector('select');
                                const values = {
                                    utype: select.selectedOptions.item(0).value
                                };
                                inputs.forEach( input => 
                                    values[input.id] = input.value
                                ); */

                                const userModel = new UserModel();
                                const resp = await userModel.setUser(formData);
                                if(resp.msg){
                                    alert(resp.msg)
                                    return;
                                }
                                // const { user } = resp;
                                // await userModel.setImage(avatar, user.uuid);

                                inputs.forEach( input => input.value = "");
                                Object.keys(isValid).forEach( key => isValid[key] = false);

                                navigate("/calendar")

                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
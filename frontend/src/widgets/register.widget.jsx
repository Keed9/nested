import { EditText, ComboBox, SubmitButton } from "../components/inputs.component";
import UserModel from "../models/user.model";
import { validate } from '../helpers/valids.helper';
import { useState } from "react";
import emailValidator from 'email-validator';
import { useNavigate } from "react-router-dom";

//STYLES
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/register.css';

//IMAGES
import userPlaceholderImg from '../assets/user_placeholder.png';

export default function Register(){

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
                                type="text"
                                id="fName"
                                placeholder="First name"
                                onBlur={(element) => {
                                        setFNameStatus(validate(element.value, 'justLetters'))
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
                                        }
                                    }
                                    error="The last name must have only letters"
                                    status={lNameStatus}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <EditText
                                    type="email"
                                    id="email"
                                    placeholder="email@example.com"
                                    onBlur={(element) => {
                                            setEmailStatus(emailValidator.validate(element.value))
                                        }
                                    }
                                    error="Email not valid"
                                    status={emailStatus}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <EditText
                                    type="pwd"
                                    id="pwd"
                                    placeholder="Password"
                                    onBlur={(element) => {
                                            setPwdStatus(validate(element.value, "pwd"));
                                        }
                                    }
                                    error="Password must have at least one special character, letters, numbers and must be eight characters long"
                                    status={pwdStatus}
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
                            type="text"
                            id="phone"
                            placeholder="Phone"
                            onBlur={(element) => {
                                    setPhoneStatus(validate(element.value, "phone"))
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
                            type="text"
                            id="avenue"
                            placeholder="Avenue"
                            onBlur={(element) => {
                                    setAvenueStatus(element.value.length > 0);
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
                                e.preventDefault();
                                const form = document.getElementById('register');
                                const inputFile = document.querySelector('input#avatar');
                                const inputs = document.querySelectorAll('#register input');
                                const avatar = inputFile.files[0];

                                const formData = new FormData(form);
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
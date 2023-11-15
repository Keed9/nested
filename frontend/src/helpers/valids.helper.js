
const _justLettersRegexp = /^[a-zA-Z]+$/
const _pwdRegexp = /^((?=.+[A-Za-z])(?=.+\d)(?=.+[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,})$/;
const _curp = /^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/;
const _phone = /^\d{8,12}$/;

function validate(string = "", type){
    let result;
    switch(type){
        case "justLetters":
            result = _justLettersRegexp.test(string);
            break;

        case "pwd":
            result = _pwdRegexp.test(string);
            break;
        
        case "phone":
            result = _phone.test(string);
            break;

        case "curp":
            result = _curp.test(string);
            break;
    }

    return result;
}

export {
    validate
}
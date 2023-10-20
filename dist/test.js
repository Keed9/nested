"use strict";
function isAdult(user) {
    return user.age >= 18;
}
const justin = {
    name: 'Justin',
    age: 25
};
console.log(isAdult(justin));

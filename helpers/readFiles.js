const fs = require('fs');
const path = require('path');

//RETURNS AN OBJECT WITH ALL CONFIGS FROM CONFIG FILE
const readConfig = () => {
    try{
        //GET CONFIG PATH FILE AND READ IT
        const configPath = path.join('/', __dirname, '..', '.config');
        let configData = fs.readFileSync( configPath , 'utf8' );
        configData = configData.replaceAll('\n', '=');
        configData = configData.split('=');


        //MAPPING VARIABLES ARRAY TO AN OBJECT
        let item = 0;
        const data = {};
        while( item <= configData.length  ){
            if( configData[item] === '' ) break;
            data[configData[item]] = configData[item + 1];
            item += 2;
        }

        return data;
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    readConfig
}

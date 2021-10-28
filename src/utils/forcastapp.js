const request = require("request");


const weatherapp = (latitude,longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b9bdc1587c938477367d29a76da891c1&query=${latitude},${longitude}`;
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("can't connect to weather app", undefined);
        } else if (body.error) {
            callback("can't find the location! please try different location.", undefined)
        } else {
            callback(undefined, {weather: body.current.weather_descriptions,
                            temperature:`Current Temperature is ${body.current.temperature} degree celsius.`,
                            feelsLike:`${body.current.feelslike} degree celsius.`,
                            humidity:body.current.humidity,
                            chances_of_rain:`${body.current.precip}%`})
        }
    })
}


// weatherapp('28.183332','76.616669', (error, data) => {
//     console.log('Error :', error);
//     console.log('Data: ', data)
// });

module.exports=weatherapp;
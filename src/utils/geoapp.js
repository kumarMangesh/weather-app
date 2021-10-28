const request=require('request');

const geoapp=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia3VtYXJtYW5nZXNoIiwiYSI6ImNrdXo4eWlyZzI1YWIydm8wMWZhaTF1MXAifQ.BoQuWxA1wszcoG50O19XqQ`;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback(`Unable to connect to service location`,undefined)
        }else if(response.body.features.length===0){
            callback(`Search not found! try another location.`);
        }else{
        callback(undefined,{longitude:response.body.features[0].center[0],
                            latitude:response.body.features[0].center[1],
                            location:response.body.features[0].place_name})
        }
    })
};


// geoapp('rewari',(error,data)=>{
//     console.log('Error: ',error);
//     console.log('Data: ',data)
// });

module.exports=geoapp;
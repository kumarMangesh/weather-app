

const successData=document.getElementById('success-data');
const button=document.getElementById('button');
const HTMLtext=document.querySelector('.data-textnode');


button.addEventListener('click',(e)=>{
    e.preventDefault()
    const inputText=document.getElementById('location').value;
    console.log(inputText)

    fetch(`/weather?search=${inputText}`)
.then(response=>{response.json().then((data)=>{
    if(data.error){
        console.log(data.error);
        textnode=data.error;
        HTMLtext.innerHTML=textnode;
        // const para=document.createElement('p');
        // const textNode=document.createTextNode(data.error);
        // const message=para.appendChild(textNode)
        // errorData.appendChild(message)
    }else{
    console.log(data.geodata,data.weatherdata)
    
    const textnode=`In ${data.geodata.location} the weather is ${data.weatherdata.weather[0]}.
     ${data.weatherdata.temperature} It feels like ${data.weatherdata.feelsLike} The chances of rain today is 
     ${data.weatherdata.chances_of_rain}. Humidity is ${data.weatherdata.humidity}`;

     console.log(textnode);
     HTMLtext.innerHTML=textnode;
        // const para=document.createElement('p');
    // const message=para.appendChild(textNode)
    // successData.appendChild(message)
    // successData.classList.add('success-data')
    }
})})

})

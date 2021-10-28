

const successData=document.getElementById('success-data');
const errorData=document.getElementById('error-data');
const button=document.getElementById('button');

button.addEventListener('click',(e)=>{
    e.preventDefault()
    const inputText=document.getElementById('location').value;
    console.log(inputText)

    fetch(`http://localhost:3000/weather?search=${inputText}`)
.then(response=>{response.json().then((data)=>{
    if(data.error){
        console.log(data.error);
        const para=document.createElement('p');
        const textNode=document.createTextNode(data.error);
        const message=para.appendChild(textNode)
        errorData.appendChild(message)
    }else{
    console.log(data.geodata,data.weatherdata)
    const para=document.createElement('p');
    const textNode=document.createTextNode(`In ${data.geodata.location} the weather is ${data.weatherdata.weather[0]}.<br>
     ${data.weatherdata.temperature} It feels like ${data.weatherdata.feelsLike} The chances of rain today is 
     ${data.weatherdata.chances_of_rain}. Humidity is ${data.weatherdata.humidity}`);
    const message=para.appendChild(textNode)
    successData.appendChild(message)
    successData.classList.add('success-data')
    }
})})

})

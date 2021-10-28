const path=require('path')
const express=require('express');
const hbs=require('hbs')
const forcastapp=require('./utils/forcastapp');
const geoapp= require('./utils/geoapp');

const app=express();
const port=process.env.PORT || 3000
// Path setup for express //
const pathdirectory=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'./templates/views');
const partialHeaderPath=path.join(__dirname,'./templates/partials');


//setup handlebar engine and view location//
app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialHeaderPath)

//static directory//
app.use(express.static(pathdirectory))

app.get('/',(req,res)=>{
    res.render('index',{
        title:"Weather app",
        info:"collects weather data around the world",
        footerText:"created by Mangesh"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
    title:"Tells weather of locations on earth.",
    info:"Weather data render around the world",
    footerText:"created by Mangesh"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send( {Error:"please provide a location!"})
    }
    geoapp(req.query.search,(error,geodata)=>{
        if(error){
            return res.send(error)
        }
    
    const {longitude,latitude}=geodata;
    forcastapp(latitude,longitude,(error,weatherdata)=>{
        if(error){
            return res.send(error)
        }
        res.send({geodata,weatherdata});
    })
    })
})

app.get("*",(req,res)=>{
    res.send("Error:404--> page not found!")
})

app.listen(port,()=>console.log(`server deployed on ${port}!!`))

console.log(__dirname)
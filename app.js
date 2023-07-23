const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.sname;
    const email = req.body.mail;

    const data = {
        members :[
          {
             email_address : email,
             status : "subscribed",
             merge_fields:{
                FNAME : firstName,
                LNAME : lastName,
             }
          }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/9ad72be019" ;
    const options = {
          method: "POST",
          auth:"vaibhav:cdecc7060c6c8f84cb2c728fb5dfaa91-us11"

    };

    const request = https.request(url,options,function(response){
     response.on("data",function(data){
        console.log(JSON.parse(data));
     })
    })
     request.write(jsonData);
     request.end();
});

app.listen(3000,function(){

    console.log("Server is running on port 3000")
}) ;

// api key
// cdecc7060c6c8f84cb2c728fb5dfaa91-us11  
// user id
// 9ad72be019
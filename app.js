const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");

const app = express ();
app.use (bodyParser.urlencoded ({extended: true}));
app.use (express.static ("public"));


app.get ("/" , function (req , response) {
    response.sendFile (__dirname + "/signup.html");
});

app.post ("/" , function (req , res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.eMail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify (data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/9ac7243ad2";

    const options = {
        method: "post",
        auth: "sinchan1:b8008322864b00ca7b66d78957efa462-us21"
    }

    const request = https.request (url, options, function (response) {
        if (response.statusCode === 404) {
            res.sendFile (__dirname + "/failure.html");
        }

        else {
            res.sendFile (__dirname + "/success.html");
        }

        
        response.on ("data" , function (data) {
            console.log (JSON.parse (data));
        }); 
    });

    // request.write (jsonData);
    request.end ();
});

app.post ("/failure" , function (req , res) {
    res.redirect ("/");
});


app.listen (3000 , function () {
    console.log ("Server is running on port 3000");
});
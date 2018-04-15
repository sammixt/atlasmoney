const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');

//create redis client
let client = redis.createClient({host : 'localhost', port : 6379});


client.on('connect',function(){
    console.log('Connected to Reddis')
});

//set port
const port = 3000;

//Init app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

// Create a new Note
    app.post('/users/add', function(req,res,next){
        //Validate
        console.log(req.body);
        if(!req.body.Id) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    //create user
     let id = req.body.Id;
     let first_name = req.body.first_name;
     let last_name = req.body.last_name;
     let email = req.body.email;
     let phone  = req.body.phone;

     client.hmset(id,[
         'first_name', first_name,
         'last_name', last_name,
         'email',email,
         'phone',phone
     ], function(err,reply){
         if(err){
             console.log(err)
              return res.status(500).send({
                message: "Error creating user"
            });
         }
         console.log(reply)
         res.status(200).send({
             message:"New User Created"
         })
     })
    });

    // Retrieve all Notes
    app.get('/users', function(req,res,next){
        client.keys('*',function(err,obj){
        if(!obj) {
            console.log(obj);
            return res.status(404).send({
                message: "Users does not exist "
            });            
        }else{
             console.log(obj);
             res.send(obj);   
        }
       
    })
    });

    // Retrieve a single Note with noteId
    app.get('/users/:userId', (req, res,next) => {
   let id = req.params.userId;
   client.hgetall(id,function(err,obj){
        if(!obj) {
            console.log(obj);
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }else{
             console.log(obj);
             res.send(obj);    
        }
       
    })
});

    // Update a Note with noteId
    app.put('/users/:userId', function(req,res,next){
        let id = req.params.userId;
        client.hgetall(id,function(err,obj){
        if(!obj) {
            console.log(obj);
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }else{
             console.log(obj);
            let first_name = (!req.body.first_name)?obj.first_name:req.body.first_name;
            let last_name = (!req.body.last_name)?obj.last_name:req.body.last_name;
            let email = (!req.body.email)?obj.email:(req.body.email);
            let phone  = (!req.body.phone)?req.body.phone:(req.body.phone);

            client.hmset(id,[
                'first_name', first_name,
                'last_name', last_name,
                'email',email,
                'phone',phone
            ], function(err,reply){
                if(err){
                    console.log(err)
                    return res.status(500).send({
                        message: "Error updating user"
                    });
                }
                console.log(reply)
                res.status(200).send({
                    message:"User User"
                })
            })
             //res.send(obj);    
        }
    })
    });

    // Delete a Note with noteId
    app.delete('/users/:userId',function(req,res,next){
        let id = req.params.userId;
        client.hgetall(id,function(err,obj){
        if(!obj) {
            console.log(obj);
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }else{
             client.del(id) ;
             res.status(200).send({
             message:"User Deleted"
         })
        }
    })
    })

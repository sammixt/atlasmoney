module.exports = (app) => {
const redis = require('../node/modules/redis');
//create redis client
let client = redis.createClient({host : 'localhost', port : 6379});


client.on('connect',function(){
    console.log('Connected to Reddis')
});

// Create and Save a new Note
app.create = (req, res) => {

};

// Retrieve and return all notes from the database.
app.findAll = (req, res) => {

};

// Find a single note with a noteId
app.findOne = (req, res,next) => {
   let id = req.params.userId
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
app.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
app.delete = (req, res) => {

};
}
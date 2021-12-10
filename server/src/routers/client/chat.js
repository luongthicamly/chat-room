var express = require('express')
const router = express.Router();

var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
router.get('/chat', (req, res) => {
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log(err);
        } else{
            const db = client.db('chatdb');
            db.collection('message').find({}).toArray( function(err, restful){
                if(err){
                    console.log(err)
                }else{
                    res.json(restful);
                    client.close()
                }
            });
        }
    })
})
module.exports = router
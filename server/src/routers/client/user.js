var express = require('express')
const router = express.Router();
var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';

router.post('/users',(req, res) => {
    res.json(req.body.user);
    data = req.body.user;
    mongoClient.connect(url, function(err, client){
        if (err){
            console.log(err)
        }else{
            var db = client.db("chatdb"); 
            db.collection('users').insertOne(data, function(err, res){
                if(err){
                    console.log(err)
                } else{
                    console.log('user inserted');
                    client.close();
                }
            })
        }
    })
});
router.get('/users',(req, res) => {
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log(err);
        } else{
            const db = client.db('chatdb');
            db.collection('users').find({}).toArray( function(err, restful){
                if(err){
                    console.log(err)
                }else{
                    res.json(restful);
                    client.close()
                }
            });
        }
    })
});
module.exports = router
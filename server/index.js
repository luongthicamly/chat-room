var express = require('express')
var app = express();
const http = require('http');
const server = http.createServer(app);

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/'; // 2 cai nay minh tach ra logic luon dung k chu const url = 'mongodb://127.0.0.1:27017/' cai nay con dua vao file config or file env sau nay dua len sv thi chi can doi lai la dc vs lai url này có thế là môi trường dev # mà sv test # ròi product lại khác nên con đưa vào file config or env
// cai nay la chuconfig don ian co the dung 1 cai cờ để xác định môi trường làm việc. 
// ben client cũng thế
// ok chu, de lat con tach ra uk

// hôm qua tách file ra con require nó vào sao nó lại báo lỗi
// con tach di loi doan nao chu kt luon cho
// tach router ra
// lop logic
// lop ket noi databas

var cors = require('cors');
app.use(cors());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
 
app.use('/',require('./src/routers'))
// app.post('/users', (req, res) => {
//     // res.send(res.query)
//     console.log(req.query, req.params, req.body)
//     res.json({
//         id: '1',
//         name: 'test'
//     })

//     // const data = res.query;
//     // const data = {name: 'Lương Thị Cam Ly', email: 'luongly9a19x@gmail.com', birthday: '28/05/1998', password: '11111', gender: 'Nữ'};
//     // console.log(res);
//     // mongoClient.connect(url, function(err, client){
//     //     if (err){
//     //         console.log(err)
//     //     }else{
//     //         var db = client.db("chatdb"); 
//     //         db.collection('users').insertOne(data, function(err, resutl){
//     //             if(err){
//     //                 console.log(err)
//     //             } else{
//     //                 client.close();
//     //             }
//     //         })
//     //     }
//     // })
// })
const socketIo = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
    // thêm cors tránh bị exception
});
socketIo.on('connection', (socket) => { // khi có connect từ client 
    console.log('new client connected' + socket.id);
    socket.on ('sendDataClient', function(data){ // khi có sự kiện sendDataClient từ phía client
        console.log(data)
        socketIo.emit('sendDataServer', {data}) // phát sự kiện sendDataServer cùng với dữ liệu tin nhắn từ phía server
        mongoClient.connect(url, function(err, client){
            if (err){
                console.log(err)
            }else{
                var db = client.db("chatdb"); 
                db.collection('message').insertOne(data, function(err, res){
                    if(err){
                        console.log(err)
                    } else{
                        console.log('message inserted');
                        client.close();
                    }
                })
            }
        })
    })
    socket.on('disconnect', ()=>{
        console.log('client disconnected'); // khi client disconnect thì log ra teminal
    })
})
// app.use('/api', require('./api'));

// app.listen(port, () => console.log('restful api:'+ port) );
server.listen(3333, () => {
    console.log('server is running in port 3333');
   // con d
});


const app = require('express')()
const bodyParser = require('body-parser')

const server = require('http').Server(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({
        status: 'OK'
    }) 
})

server.listen(8803, function () { 
    console.log(8803)
})

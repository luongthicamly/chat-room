var express = require('express');
const router = express.Router();
// const User = require("./model/user");
// const auth = require("./middleware/auth");
router.use('/login',( req,res) => {
    console.log(req.body.user)
    res.send({
            token: 'tesst111'
        })
});
module.exports = router

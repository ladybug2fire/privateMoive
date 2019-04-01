var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    User.find(function(err, docs){
        console.log(docs);
        res.json(docs)
    })
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

router.post('/new', function(req, res){
    console.log(req.body)
    // var user = new User({
    //     username : 'Tracy McGrady',                 //用户账号
    //     userpwd: 'abcd',                            //密码
    //     userage: 37,                                //年龄
    //     phone: 1377078464,
    // });
    // user.save(function (err, result) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         res.redirect('/user');    
    //     }
    // });
    res.send(req.body.name)
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
})

router.get('delete', function(req, res){
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

router.get('get', function(req, res){
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

module.exports = router;
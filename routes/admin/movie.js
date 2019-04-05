var Movie = require("../../models/movie.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');

var upload = multer({ dest: 'uploads/img/'});

router.post("/upload", upload.single('file'), function(req, res, next){
    let obj = req.file;
    let movie = new Movie({
        moviename : req.body.moviename,
        addTime: new Date().toLocaleString(),
        picUrl: '/img/' + obj.filename,
        movieyear: req.body.movieyear,
        sales: 0,
        star: req.body.star || 0,
        desc: req.body.desc,
    });
    movie.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '发布成功'
            }) 
        }
     });
     res.json({
        code: 200,
        msg:'success'
     });
});


router.get('/', function(req, res){
    Movie.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/movie/list", {title: '影片', layout: 'admin/layout', list: docs });
    })
});

router.get('/list', function(req, res){
    Movie.find(function(err, docs){
        if(err){
            res.json({
                code: 500,
                msg: err
            })
        }else{
            res.json({
                code: 200,
                data: docs,
            })
        }
    })
})

router.get('/new', function(req, res){
    res.render("admin/movie/new", {title: '发布影片', layout: 'admin/layout'})
})

router.get('/delete', function(req, res){
    Movie.findByIdAndRemove(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
});

router.get('/get', function(req, res){
    movie.findById(req.query.id, function(err, result){
        res.json(result)
    })
});

module.exports = router;
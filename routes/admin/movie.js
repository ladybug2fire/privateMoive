var Movie = require("../../models/movie.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
// 上传模块
var multer = require('multer');
// 实例化上传模块(前端使用参数名为file)
var upload = multer({ dest: 'uploads/img/'});
// 单文件上传
router.post("/upload", upload.single('file'), function(req, res, next){
    let obj = req.file;
    let movie = new Movie({
        moviename : req.body.moviename,
        addTime: new Date().toLocaleString(),
        picUrl: '/img/' + obj.filename,
        movieyear: req.body.movieyear,
        sales: 0,
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
                msg: '创建账号成功'
            }) 
        }
     });
     res.json({
        code: 200,
        msg:'success'
     });
});


router.get('/', function(req, res){
    Movie.find(function(err, docs){
        // res.json(docs)
        res.render("admin/movie/list", {title: '影片', layout: 'admin/layout', list: docs });
    })
});

router.post('/new', function(req, res){
    Movie.find({ moviename: req.body.name}, function(err, result){
        if(result.length){
            res.send('moviename is in used')
        }else{
            var movie = new Movie({
                moviename : req.body.name,
                moviepwd: req.body.pwd,
                phone: req.body.phone,
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
                    // res.json({
                    //     code: 200,
                    //     msg: '发布成功'
                    // }) 
                }
            });
        }
    })
})

router.get('/new', function(req, res){
    res.render("admin/movie/new", {title: '发布影片', layout: 'admin/layout'})
})

// 编辑要修改下
router.post('/edit', function(req, res){
    Movie.find({ moviename: req.body.name}, function(err, result){
        if(result.length){
            res.send('moviename is in used')
        }else{
            var movie = new Movie({
                moviename : req.body.name,
                moviepwd: req.body.pwd,
                phone: req.body.phone,
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
        }
    })
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
                msg: '创建账号成功'
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
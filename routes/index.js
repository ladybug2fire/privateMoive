var Movie = require("../models/movie.js");
var Order = require("../models/order.js");
var _ = require('lodash')
exports.index = function (req, res) {
    Movie.find().sort({'_id': -1}).exec(function(err, docs){
        if(err)res.send("出错了");
        res.render("index", { title: '首页' , list: docs});
    })
}

exports.signup = function(req, res){
    res.render("signup", {title: '注册', layout: 'base' });
}

exports.login = function(req, res){
    res.render("login", {title: '登入' });
}

exports.order = function(req, res){
    res.render("order", {title: '选座' });
}

exports.detail = function(req, res){
    Movie.findById(req.query.id, function(err, result){
        if(err){
            res.send('err', err)
        }else{
            res.render("detail", {title: '详情' , movie: result});
        }
    })
}

exports.buy = async function(req, res){
    let seats = req.body['seats[]'];
    Movie.findByIdAndUpdate(req.body.id,{$addToSet :{sales:
        {$each: seats},
    }}, function(err, result){
        if(err){
            res.send('err, movie', err)
        }else{
            if(_.isEmpty(_.intersection(result.sales),seats)){
                let order = new Order({
                    movieid: req.body.id,
                    seats: seats,
                    userid: 1234,
                    username: '',
                });
                order.save(function(err, result2){
                    if(err){
                        res.json({
                            code:500
                        })
                    }else{
                        res.json({
                            code: 200,
                            msg: '下单成功'
                        })
                    }
                })
            }else{
                res.json({
                    code:500,
                    msg: '无效订单'
                })
            }
        }
    });
}
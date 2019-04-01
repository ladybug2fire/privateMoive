exports.index = function (req, res) {
    res.render("index", { title: '首页' });
}

exports.signup = function(req, res){
    res.render("signup", {title: '注册', layout: 'base' });
}

exports.login = function(req, res){
    res.render("login", {title: '登入' });
}
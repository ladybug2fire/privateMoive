exports.index = function(req, res){
    res.render("admin/index", {title: '登入', layout: 'admin/layout' });
}
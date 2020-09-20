module.exports=function(req,res,next){
    //req.user obj is provided by jwt(payload) which has isAdmin property
    if(!req.user.isAdmin) return res.status(403).send('access denied not admin....');
    next();
    //this mw is used for routes that require admin permission
}
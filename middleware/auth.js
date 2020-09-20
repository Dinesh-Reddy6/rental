//verifying jwt token sent by user is valid or not , for giving routes permision
const jwt=require('jsonwebtoken');     
const config=require('config');

function auth(req,res,next){

    const token=req.header('x-auth-token');
    if(!token) return res.status(401).send('access denied ..no token..')

    try{   
        const decoded=jwt.verify(token,config.get('jwtPrimaryKey'));//we get payload here
        req.user=decoded //storing payload in req.user, using these we can access props of payload
        next();    
    }
    catch(ex){ //if token doesn't match it throws error
        res.status(400).send('invalid token....');
    }
}
module.exports=auth;
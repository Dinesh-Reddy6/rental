const winston=require('winston')

module.exports=function(err,req,res,next){   //error midleware, this takes err as extra parameter
    //1.log error
    winston.error(err.message,err)
    //2. display err to client (res)
    console.log(err)
    res.status(500).send('someting failed....')//this sends res to client if any error occurs(so it should be last mw func)
     }
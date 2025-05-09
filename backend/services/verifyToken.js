const jwt = require("jsonwebtoken");

const verifyToken = (token)=>{
    try{
        const verified = jwt.verify(token,process.env.SECRET_KEY);
    if(verified?.id){
        return verified?.id
    }
    }catch(error){
        return null;
    }
}

module.exports = verifyToken;
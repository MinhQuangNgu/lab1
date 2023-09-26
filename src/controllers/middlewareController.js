import jwt from 'jsonwebtoken';
class MiddlewareController{
    async verifyToken(req,res,next){
        try{
            const token = req.headers.authorization;
            const accessToken = token.split(" ");
            if(accessToken.length > 1){
                jwt.verify(accessToken[1],process.env.JWT_SECRET,(err,user) => {
                    if(err){
                        return res.status(401).json({message:"Invalid unauthorized"});
                    }
                    req.user = user;
                    return next();
                });
            }
            else{
                return res.status(401).json({message:"Invalid unauthorized"});
            }
        }
        catch(err){
            return res.status(500).json({message:"Authentication failed"});
        }
    }
}

export default new MiddlewareController;
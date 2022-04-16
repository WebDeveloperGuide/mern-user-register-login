import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) =>{
	const authHeader = req.headers.authorization;
	
	if(authHeader){
		const token = authHeader.split(" ")[1];
		jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
			if(err){
				res.status(403).json({status:0,message:"Invalid Token"});				
			}else{
				req.user = user;
				next();
			}
		})

	}else{
		return res.status(401).json({status:0,message:"You are not authenticated!"});
	}
}
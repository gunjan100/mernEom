const adminMiddlewares = async(req, resp, next)=>{
    try {
        const admin = req.user.role
        if(!admin){
            return resp.status(402).json({msg:"Sorry you are not admin!!!"})
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = adminMiddlewares
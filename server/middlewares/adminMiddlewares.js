const adminMiddlewares = async(req, resp, next)=>{
    try {
        const admin = req.user.isAdmin
        if(!admin){
            return resp.satuts(402).json({msg:"Sorry you are not admin!!!"})
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = adminMiddlewares
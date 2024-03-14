const bcyrpt = require('bcrypt')

const hashPass = async(pass)=>{
    try {
        const genSalt = 10;
        const hashedp= await bcyrpt.hash(pass, genSalt)
        return hashedp
        
    } catch (error) {
        console.log(error);
    }
}

const compPass = async(pass, hashedp)=>{
    return await bcyrpt.compare(pass, hashedp)
}

module.exports = {hashPass, compPass}
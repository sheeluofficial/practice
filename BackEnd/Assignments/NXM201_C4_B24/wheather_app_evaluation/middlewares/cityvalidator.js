const cityValidator = (req,res,next)=>{
    const cityName = req.params.city;
    let regex = /^[a-zA-Z\s]+$/
    if(regex.test(cityName)){
        next();
    }else{
        return res.status(400).send({msg:"Please provide valid city name."})
    }
}
module.exports = {cityValidator};

const post = (model) => async(req, res) =>{
    try{
        const item =await model.create(req.body);
        res.send(item);
    }
    catch(e){
        res.send(e.message);
    }

}

const getAll = (model) => async(req, res) =>{
    try{
        const item = await model.find().lean().exec();
        res.send(item);
    }
    catch(e){
        res.send(e.message);
    }
}





module.exports =(model)=>{
    return {
        post:post(model),
        getAll:getAll(model),
    }
}
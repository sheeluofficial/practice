const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect(
        "mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
}

// ---------------Books model------------
const bookSchema = new mongoose.Schema({
    name:{type:String, required:true},
    body:{type:String, required:true},
    auth_ids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true,
    }],
    section_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true,
    }  
},
{
    timestamps:true,
    versionKey:false,
}
);

const Book = mongoose.model("books", bookSchema);

// -----------------Author Model---------
const authorSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true}, 
},{
    timestamps:true,
    versionKey:false
});

const Author = new mongoose.model("author", authorSchema);


// ----------------------Section Model---------
const sectionSchema = new mongoose.Schema({
    name:{type:String, required:true}
})

const Section = mongoose.model("section", sectionSchema);

//-----------------CheckedOut Model--------
const coutschema = new mongoose.Schema({
    chkout:{type:Boolean, required:false, default:false},
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"books", 
        required:true,
    }
},{
    timestamps:true,
    versionKey:false
})

const Checkout = mongoose.model("checkout", coutschema);

//-------------CRUD for Checkout--------------------------

app.get("/checkout", async(req, res)=>{
    try{
        const chkout = await Checkout.find().lean().exec();
        res.send(chkout);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.get("/checkout/:id", async(req, res)=>{
    try{
        const chkout = await Checkout.findById(req.params.id).lean().exec();
        res.send(chkout);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.post("/checkout", async(req, res)=>{
    try{
        const chkout = await Checkout.create(req.body);
        res.send(chkout);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.patch("/checkout/:id", async(req, res)=>{
    try{
        const chkout = await Checkout.findByIdAndUpdate(req.params.id, req.body,{true:1})
        res.send(chkout);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.delete("/checkout/:id", async (req, res)=>{
    try{
        const chkout = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
        res.send(chkout);
    }
    catch(e){
        res.status(404).send(e.message);
    }
})

//-------------CRUD for section--------------------------

app.get("/section", async(req, res)=>{
    try{
        const sections = await Section.find().lean().exec();
        res.send(sections);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.get("/section/:id", async(req, res)=>{
    try{
        const section = await Section.findById(req.params.id).lean().exec();
        res.send(section);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.post("/section", async(req, res)=>{
    try{
        const section = await Section.create(req.body);
        res.send(section);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.patch("/section/:id", async(req, res)=>{
    try{
        const section = await Section.findByIdAndUpdate(req.params.id, req.body,{true:1})
        res.send(section);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.delete("/section/:id", async (req, res)=>{
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
        res.send(section);
    }
    catch(e){
        res.status(404).send(e.message);
    }
})


//-------------CRUD for Author--------------------------

app.get("/author", async(req, res)=>{
    try{
        const authors = await Author.find().lean().exec();
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.get("/author/:id", async(req, res)=>{
    try{
        const authors = await Author.findById(req.params.id).lean().exec();
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.post("/author", async(req, res)=>{
    try{
        const authors = await Author.create(req.body);
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.patch("/author/:id", async(req, res)=>{
    try{
        const authors = await Author.findByIdAndUpdate(req.params.id, req.body,{true:1})
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.delete("/author/:id", async (req, res)=>{
    try{
        const authors = await Author.findByIdAndDelete(req.params.id).lean().exec();
        console.log(req.params.id)
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
})

//-------------CRUD for Books--------------------------

app.get("/book", async(req, res)=>{
    try{
        const books = await Book.find()
        .populate({path:"auth_ids", select:"first_name"})
        .populate({path:"section_id", select:"name"})
        .lean().exec();

        res.send(books);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.get("/book/:id", async(req, res)=>{
    try{
        const books = await Book.findById(req.params.id).lean().exec();
        res.send(books);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.post("/book", async(req, res)=>{
    try{
        const books = await Book.create(req.body);
        res.send(books);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.patch("/book/:id", async(req, res)=>{
    try{
        const books = await Book.findByIdAndUpdate(req.params.id, req.body,{true:1})
        res.send(books);
    }
    catch(e){
        res.status(404).send(e.message);
    }
});

app.delete("/book/:id", async (req, res)=>{
    try{
        const authors = await Book.findByIdAndDelete(req.params.id).lean().exec();
        res.send(authors);
    }
    catch(e){
        res.status(404).send(e.message);
    }
})


//------------req api end points------------

app.get("/author/books/:auth_id", async (req, res)=>{
    try{
        const hisBooks=await Book.find({
            auth_ids:[{_id:req.params.auth_id}]
        })
        .populate({path:"auth_ids", select:"first_name"})
        .populate({path:"section_id", select:"name"})
        .lean().exec();
        res.send(hisBooks);
    }
    catch(e){
        res.send(e.message);
    }
})


// app.get("/section/books/:sec_id", async (req, res)=>{
//     try{
//         const secBooks=await Book.find({section_id:{_id:req.params.sec_id}})
//         .populate({path:"section_id"})
//         .populate({path:"auth_ids"})
//         .lean().exec();
//         res.send(secBooks);
//     }
//     catch(e){
//         res.send(e.message);
//     }
// })

// auth_ids:[{_id:req.params.auth_id}]

app.get("/section/books/:sec_id/:auth_id", async (req, res)=>{
    try{
        // const secBooks=await Book.find({section_id:{_id:req.params.sec_id},auth_ids:[{_id:req.params.auth_id}]})
        const secBooks=await Book.find({section_id:req.params.sec_id,auth_ids:[req.params.auth_id]})
        .populate({path:"section_id"})
        .populate({path:"auth_ids"})
        .lean().exec();
        res.send(secBooks);
    }
    catch(e){
        res.send(e.message);
    }
})


app.get("/section/books/:sec_id", async (req, res)=>{
    try{
        const secBooks=await Book.find({section_id:{_id:req.params.sec_id}})
        .populate({path:"section_id"})
        .populate({path:"auth_ids"})
        .lean().exec();

        console.log(secBooks);

        let single_auth=secBooks.filter((elem)=>{
            return elem.auth_ids.length==1;
        });

        res.send(single_auth);
        // res.send(secBooks)
    }
    catch(e){
        res.send(e.message);
    }
})

app.get("/checkout-books", async (req, res)=>{
    try{
        const chkoutBooks=await Checkout.find({chkout:true})
        .lean().exec();
        res.send(chkoutBooks);
    }
    catch(e){
        res.send(e.message);
    }
})

app.get("/checkout-books/:sec_id", async (req, res)=>{
    try{
        const chkoutBooks=await Checkout.find({section_id:req.params.sec_id, chkout:false})
        .populate({path:"book_id", select:"name"})
        .lean().exec();
        
        res.send(chkoutBooks);
    }
    catch(e){
        res.send(e.message);
    }
})






app.listen(3000, async ()=>{
    try{
        await connect();
        console.log("Listening at port 3000");
    }
    catch(er){
        console.log("Some Error :", er.message);
    }
})
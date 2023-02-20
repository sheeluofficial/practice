const mongoose=require('mongoose');
module.exports=()=>new mongoose.connect(`mongodb+srv://mock-12:mock-12@cluster0.7wg64bk.mongodb.net/quiz-app?retryWrites=true&w=majority`)
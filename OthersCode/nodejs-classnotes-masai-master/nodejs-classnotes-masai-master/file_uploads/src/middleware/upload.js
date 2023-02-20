const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.random().toString();
      cb(null, uniquePrefix + '-' + file.originalname)
    }
  });


  function fileFilter (req, file, cb) {

   if(file.mimetype==="image/jpeg" || file.mimetype ==="image/png"){
       
       cb(null, true);
   }
   else{
       
       cb(new Error("only jpeg and png allowed"), false)
   }

}

  


function uploadSingle(key_value){
    return async function (req, res, next){
        const item = upload.single(key_value);
        item(req, res, function(err){
            
            if (err instanceof multer.MulterError) {
                res.send(err.message)
              } else if (err) {
                res.send(err.message)
              }
              
              // Everything went fine.
              next();
        })
        
    }
}

    var upload = multer({ 
      storage,
      fileFilter,
      limits:{
          fileSize:1024*1024*5,
      }
    });
    
module.exports = {upload, uploadSingle};
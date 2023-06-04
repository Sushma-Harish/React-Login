const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/react-login ")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

  

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const userSchema = new mongoose.Schema({
    fullName: String,
    companyName: String,
    mobileNumber: String,
    username: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);

const collection = mongoose.model("collection",newSchema)

module.exports=collection

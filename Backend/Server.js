const mongoose=require('mongoose');
const express=require("express");
const cors=require("cors");
const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());

const mongoURI='mongodb://localhost:27017/commercedatabase';
mongoose.connect(mongoURI)
.then(()=>console.log('MongoDb connected successfully'))
.catch(error=>console.log('Error connecting to MongoDB:',error));


// User Schema
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
          type:String,
          required:true,
        },
       

});
// create User Model
const User=mongoose.model('User',UserSchema);
// Post Api
app.post('/api/user',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        // check for missing fields
        if(!name||!email||!password){
            return res.status(400).json({message:'All field are required'});

        }
        // create a new user instance
        const newUser=new User({
            name,
            email,
            password,
        });
        // save user to the database
        await newUser.save();
        res.status(200).json({message:'User created successfully',user:newUser});

    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Error creating user'})
    }
});

// Login Api
app.post('/api/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:'Email and password is required'});

        }
        // Data  match check
        if(exitinguser.password!=password){
            return res.status(400).json({message:'Invalid password'});

        }
        res.status(200).json({message:'Login Successfully',user:existinguser});

    }
    catch(error){
        console.error('Error during Login',error);
        res.status(500).json({message:'Error during login'});
    }
})

// delete api
app.delete('/api/user/:id',async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({message:'Invalid User Id'});

        }
        const deleteuser=await UserActivation.findByIdAndDelete(userId);
        if(!deleteuser){
            return res.status(400).json({message:'User Not Found'});

        }
        res.status(200).json({message:'User Deleted Successfully',user:deleteuser});

    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error during user delete'});
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

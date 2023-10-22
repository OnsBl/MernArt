const Users = require("../models/UserSchema")
const works = require("../models/WorkSchema")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require("../models/UserSchema")

const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dj1jyl46q', 
    api_key: '282441591922432', 
    api_secret: 'zD2mxxbGgXUeVe0kNUt2gwA4Mgk' 
  });
const userController = 
{
    getUsers:async(req,res)=>{
        const users = await Users.find()
        res.send(users);
    },

    //get user buy Id
    getUser:async(req,res)=>{
        const userId = req.body.id;
        const user  = await Users.findById(userId);
        res.send(user);
    },

    register:async(req,res)=>{

        const {name,email,password,confirmPassword}=req.body

        if (!name||!email||!password||!confirmPassword)
          return res.status(400).json({message:"missing fileds"})

        const user=await Users.findOne({email:email})

        if(user)
            return res.status(400).json({message:"user already exist sign in please"})

        if(password!=confirmPassword)
            return res.status(400).json({message:"password missmatch"})

            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(password, salt);
        
        
        const newUser= await Users.create({name:name,email:email,password:hashedPassword})

        if(!newUser)
                return res.status(500).json({message:"error creating user"})

        return res.status(200).json({message:"success user created",user:{userid:newUser._id,name:newUser.name,email:newUser.email,age:newUser.age,token:genToken(newUser)}})
    },
    login:async(req,res)=>{

        const {email,password} = req.body
        if(!email||!password)
                return res.status(400).json({message:"missing fileds"})
        
        const user=await Users.findOne({email:email})

        if(!user)
         return res.status(401).json({message:"user not registered"})

       
          const isMatch =bcrypt.compare(password,user.password)

         if(!isMatch)
         return res.status(401).json({message:"wrong password"})

         return res.status(200).json({message:"login successful",user:{userid:user._id,name:user.name,email:user.email,age:user.age,role:user.role,token:genToken(user)}})
    },

    updateUser:async(req,res)=>{
        const userId = req.body.id;
        const { name, age } = req.body;
      
        if (!userId || (!name && !age)) {
          res.status(400).json({ message: 'missing id or fields' });
        }
        const updateData = {};
        if (name) updateData.name = name;
        if (age)  updateData.age = age;

        const updatedUser = await Users.findByIdAndUpdate(userId, { $set: updateData });

        if (!updatedUser) {
            res.status(404).json({ message: 'user not found !' });
          }
        
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        
    },

    deleteUser:async(req,res)=>{
        const userId = req.body.id;

        if (!userId) {
          res.status(400).json({ message: 'missing id' });
        }
      
        const deletedUser = await Users.findByIdAndDelete(userId);
      
        if (!deletedUser) {
          res.status(404).json({ message: 'user not found !' });
        }
      
        res.status(200).json({ message: 'User deleted successfully', deletedUser: deletedUser });
    },
    
    addHisWork:async(req,res)=>{
        console.log(req.file.filename)
        const userId = req.body.userId;
        const workId = req.body.workId;
        //TODO : 
        /* 
          fix add work using token ,
        
            mediaPath = req.files.map(e=>e.destination.join(e.filename))


        */
       //upload to cloudinary
            cloudinary.uploader.upload(req.file.path,
                function(error, result) {console.log(result); });

        const user = await Users.findById(userId);
        
        user.works.push(workId)
        await user.save()
        if (!user) {
             res.status(404).json({ message: 'User not found' });
          } 
        res.status(201).json({ message: 'Work added successfully' });
    },



    removeHisWork : async (req, res) => {
        const userId = req.body.userId;
        const workId = req.body.workId;

        const user = await Users.findById(userId);
        const work = await works.findById(workId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        if (!work) {
            res.status(404).json({ message: 'Work not found' });
        }
        console.log(work)

        if (userId == work.user) {

            user.works.splice(workId,1)

            await user.save()
            await work.save()
            res.status(200).json({ message: 'Work removed successfully' });
        } else {
            res.status(403).json({ message: 'Cannot remove this work' });
        }
    }
    ,
        profile:async(req,res)=>{
            res.status(200).json(req.user)
        }
}

const genToken=(user)=>{

    return  jwt.sign({id:user._id,email:user.email},"123456",{expiresIn:"7d"})

}

module.exports = userController
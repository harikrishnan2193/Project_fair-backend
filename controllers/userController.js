//logic to resolve the request
//import model
const users = require('../Modals/usersSchema')

//import jwt
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    //logic
    console.log('inside controller  register function');
    //extract dat from request body - json() in index.js file convert json data into javascript object
    console.log(req.body);
    const {username,email,password} = req.body
      try{
        const existUser = await users.findOne({email})
      if(existUser){
        res.status(406).json('Accont Already Exist....Please Login')
      }
      else{
        //create an object for the model
        const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
        //save function in mongoose - to permanently store this data in mongodb
        await newUser.save()
        //response
         res.status(200).json(newUser)
      }}
      catch(err){
        res.status(401).json('Request failed dew to' , err)
      }

    
}

//logic for Login

exports.login =async(req,res)=>{
  console.log('inside controller login function');

  const {email,password} = req.body

   try{const existingUser = await users.findOne({email,password})
   console.log(existingUser);

   if(existingUser){

    const token = jwt.sign({userId:existingUser._id},"supersecretekey12345") //first argument is the data that is send inside the token and the second argument is the key based on which the token is generated

    res.status(200).json({
      existingUser,
      token
    })
   }
   else{
    res.status(406).json('Incorect email id or password')
   }}catch(err){
    res.status(401).json(`login failed due ${err}`)
   }

}

//logic for edit profile
exports.editUser = async(req,res)=>{
  const userId =req.payload
  const{username,email,password,github,linkedin,profile} = req.body

  const profileImage = req.file?req.file.filename:profile

  try {
    const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

    await updateUser.save()
    res.status(200).json(updateUser)
    
  } catch (error) {
    res.status(401).json(error)
  }

}
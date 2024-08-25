//1 import userSchema or models
const users=require('../Models/userSchema')

const jwt=require('jsonwebtoken')

//2 Register logic
exports.register=async(req,res)=>{
    //accept data from client
    const{username,email,password}=req.body
    console.log(username,email,password);

    try{
        //check the email is already registered
        const existingUser= await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already registered")
        }
        else{
            const newUser= new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(201).json(newUser)
        }
        }
    catch(err){
        res.status(300).json("register failed...")
    }
}



//Login logic

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if the email exists in the database
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        // Compare the entered password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if (isPasswordValid) {
          const token = jwt.sign({ userId: existingUser._id }, "itsok2024", { expiresIn: '1h' }); // Adding an expiration time for the token
          console.log(token);
          res.status(200).json({ existingUser, token });
        } else {
          res.status(401).json('Invalid email or password');
        }
      } else {
        res.status(404).json('Invalid email or password');
      }
    } catch (err) {
      res.status(500).json("Login failed: " + err.message);
    }
  };
  



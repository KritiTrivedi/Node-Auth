import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// create User
export const create = async (req, res, next) => {
    try{
             const {email, firstName, password} = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({error:"user already exits"});

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User ({
        firstName,
        email,
       password: hashedpassword
    })
    await newUser.save();
    res.status(201).json(newUser);

}
catch(error){
    res.status(400),json({error:"Something Whet Wrong"});
}
}

// login 
export const login = async(req, res, next)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:"invalid password"});

    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword) return res.status(400).json({error:"Invalid Password"})

    let token = jwt.sign({ userId: user._id, user:user.firstName, user:user.email},process.env.JWT_SECRET);
    res.status(200).json({jwt:token})

}

//find All
export const findAll = async(req, res, next)=>{
    res.status(200).json({ users:await User.find() })
} 
    


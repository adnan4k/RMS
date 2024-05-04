import User from "../models/User.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
import { createError } from "../utils/CreateError.js";

export const register = async (req, res, next) => {
  try {
    const {  email, username, firstname, lastname, password, phonenumber } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      password: hash,
      email,
      username,
      firstname,
      lastname,
      phonenumber
    });

    const user = await newUser.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret_key"
    );
    
    const { password: p, role, isActive, ...otherDetails } = user._doc;
    
    return res
      .cookie("access_token", token, { httponly: true })
      .status(200)
      .json({ ...otherDetails });
    
  } catch (error) {
    next(error);
  }
};


  export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !user.isActive) 
        throw createError(404, "user not found");
      
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect)
        throw createError(400, "username or password incorrect");
      
      const token = jwt.sign(
        { id: user._id, role: user.role },
        "secret_key"
      );
    
      const { password, role, isActive, ...otherDetails } = user._doc;
      return res
        .cookie("access_token", token, { httponly: true })
        .status(200)
        .json({ ...otherDetails });
    } catch (error) {
      next(error);
    }
  };

export const forgetPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    
    if (!identifier)
      throw createError(400, "Required field missing!");
    
    const user = await User.findOne({$or: [{email: identifier} , {username: identifier}]});
    
    if (!user)
      throw createError(400, "User not found");
    
    const token = jwt.sign(
      { id: user._id },
      "secret_key",
      { expiresIn: '60m' }
    );

    await sendEmail(user.email, token);
    return res.status(201).json({msg: 'Email for reseting password sent!!'});
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    if (!req.params.token)
      throw createError(401, "Token not found");
    
    const { password } = req.body;
    
    jwt.verify(req.params.token, 'secret_key', (err, decoded) => {
      if (err)
        return res.status(401).json({msg: 'Invalid token'})
      req.id = decoded.id;
    });
    const user = await User.findById(req.id);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    user.password = hash;
    user.isActive = true;
    
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret_key"
    );

    const { password:p, role, isActive, ...otherDetails } = user._doc;
    
    return res
      .cookie("access_token", token, { httponly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error)
  }

}
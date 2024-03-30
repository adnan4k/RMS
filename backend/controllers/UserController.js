import User from "../models/User.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
import { createError } from "../utils/CreateError.js";

export const register = async (req, res, next) => {
    const {  email, name, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    try {
      const newUser = new User({
        password: hash,
        name: name,
        email: email,
      });
      await newUser.save();
      return res.status(201).json("user has been created");
    } catch (error) {
      next(error);
    }
  };
  export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return createError(404, "user not found");
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return createError(400, "username or password incorrect");
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        "secret_key"
      );
      const { password, role, ...otherDetails } = user._doc;
      return res
        .cookie("access_token", token, { httponly: true })
        .status(200)
        .json({ ...otherDetails });
    } catch (error) {
      next(error);
    }
  };
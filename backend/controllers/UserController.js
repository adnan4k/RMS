

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
  
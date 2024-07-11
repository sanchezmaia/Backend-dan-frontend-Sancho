import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email Invalid ou Email Iha tia ona" });
    }

    const user = new User(req.body);
    const insertedUser = await user.save();
    res.status(201).json(insertedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate key error" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

//export const saveUser = async (req, res) => {
// const user = new User(req.body);
//try {
//const inserteduser = await user.save();
// res.status(201).json(inserteduser);
//} catch (error) {
// res.status(400).json({ message: error.message });
// }
//};

export const updatedUser = async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteuser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

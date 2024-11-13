import { create } from "domain";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(409)
        .send(
          new ApiResponse(
            409,
            null,
            "User with the provided email already exists."
          )
        );
    }

    const validRoles = ["student", "college", "company"];

    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid role selected."));
    }

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role,
    });

    const userObj = createdUser.toObject();

    const filteredUser = {
      _id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      phone: userObj.phone,
      role: userObj.role,
    };

    const at = createdUser.generateAccessToken();

    const rt = createdUser.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    const responseObj = {
      user: filteredUser,
      at,
      rt,
    };

    res
      .status(201)
      .send(new ApiResponse(201, responseObj, "User registered successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to register user."));
  }
};

export { registerUser };

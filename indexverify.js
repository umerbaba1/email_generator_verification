const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./verification2");

const { sendMail } = require("./test");
require('dotenv').config()

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const UnverifiedUser = await UserModel.findOne({
    email,
    password,
    isVerified: false,
  });
  if(UnverifiedUser){
    const userId = jwt.sign(
        {
          id: UnverifiedUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "15min" }
      );
      const link = `http://192.168.29.252:2000/verification?token=${userId}`;
      sendMail(email,link)
      res.json("Link to verify")
  }else{
  const User = await UserModel.create({
    email,
    password,
    isVerified: false,
  });
  const userId = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15min" }
  );
//   res.json(userId);
  const link = `http://192.168.29.252:2000/verification?token=${userId}`;
  sendMail(email,link)
  res.json("Link to verify")
}
});
app.get("/verification", async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.json("No token");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodedToken.id) {
    await UserModel.updateOne(
      {
        _id: decodedToken.id,
      },
      {
        isVerified: true,
      }
    );
    res.json("You are verified");
  } else {
    res.json("Please Signup again");
  }
});

async function main(params) {
  await mongoose.connect(
   process.env.MONGO_URL_EMAIL
  );
  console.log("Connected to MongoDb");
  app.listen(2000, () => {
    console.log("Listeninig at port 2000");
  });
}
main();

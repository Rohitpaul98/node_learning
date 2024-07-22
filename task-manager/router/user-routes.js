const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const nodemailer = require("nodemailer");

//middleware imported
const auth = require("../src/middlewares/auth");

//importing user model
const User = require("../models/User.model");

//create new user
router.post("/create-user", async (req, res) => {
  const { name, email, password } = req.body;
  const isOldUser = await User.findOne({ email: req.body.email });
  if (isOldUser) {
    return res
      .status(400)
      .send({ message: "User with this email already exists!" });
  }
  const user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 8),
  });
  await user.save();
  res.status(201).send({
    user: user.name,
    email: user.email,
    message: "Account created successfully",
  });
});

//login feature for registered users
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log("User", user)
    const enteredPassword = req.body.password;
    if (!user) {
      return res.status(400).send({ message: "User Does not exist!" });
    }
    const isAuthenticated = await bcrypt.compare(
      enteredPassword,
      user.password
    );
    if (!isAuthenticated) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id.toString() }, "SECRETKEY");
    user.authToken = token;
    user.save();
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      authToken: user.authToken,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Logout route
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.authToken = null;
    await req.user.save();
    res.send({ message: "User logged out!" });
  } catch (e) {
    res.status(500).send();
  }
});

//Get all users list
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Pagination

router.get("/users/pagination", auth, async (req, res) => {
  try {
    const pageNumber = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    let skipPage = (pageNumber - 1) * limit;
    const users = await User.find({}).skip(skipPage).limit(limit);

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
})


//get authenticated user's logged Profile
router.get("/user/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Get User by specific id/unique id
router.get("/users/:id", async (req, res) => {
  // console.log(req.params);
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// middleware update profile picture or avatar(To demonstrate file uploading in nodejs.)
const uploadProfilePicture = multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  filename: (req, file, cb) => {
    cb(null, file.file.fieldname + '_' + Date.now())
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Invalid filetype!please upload JPG or JPEG,PNG"))
    }
    cb(undefined, true)
  }
})

router.post("/user/me/avatar", auth, uploadProfilePicture.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.status(200).send({ message: "Image uploaded successfully", file: req.file });
},
  //error handling
  (error, req, res, next) => {
    res.status(400).send({ message: "Can't proceed with your request", error: error.message })
  })

//Deleting uploaded image avatar

router.delete('/user/me/avatar/delete', auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save();
    res.status(200).send({ message: "Image Deleted" })
  } catch (error) {
    new Error({ error: error.message })
  }

})

//Get profile picture

router.get('/user/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error('User not found')
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send({ message: e })
  }
})

//update(patch) user by Id--patch changes specific field in document
router.patch("/user/edit-profile", auth, async (req, res) => {
  const toUpdate = Object.keys(req.body);
  const allowedToUpdate = ["name", "email", "password"];
  const canUpdate = toUpdate.every((update) => {
    allowedToUpdate.includes(update);
  });

  // if (!canUpdate) {
  //     return res.status(400).send('Invalid Request');
  // }
  try {
    //below line updates user(any entity) by id and and return the new updated user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).send({ message: "Can't perform the operation" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: "Unable to update something went wrong" });
  }
});

//Deletes only logged in users
router.delete("/user/delete-profile", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      res.status(400).send({ message: "Bad request,User does not exist" });
    }

    res.status(200).send({ message: `User has been deleted successfully` });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
});

//Sending mail
//connect with SMTP
router.get('/send_mail', auth, async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount();
  //Created transporter first
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ozella22@ethereal.email',
      pass: 'g91Z8w5R1YRqAcYsqK'
    }
  });

  let mailInfo = await transporter.sendMail({
    from: '"Rohit Pal 👻" <ozella22@ethereal.email>', // sender address
    to: "rohitpaulofficial99@gmail.com, baz@example.com", // list of receivers
    subject: "Hello Test ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  })

  res.status(200).send(mailInfo);

})

module.exports = router;

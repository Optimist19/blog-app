const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./schema-models/user");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const passportInitializationFtn = require("./authentication/auth");
const { hashPasswordFtn } = require("./hashPassword/hashPassword");
const Blog = require("./schema-models/blog");

const app = express();

const port = 5000; 
app.use(express.json());

passportInitializationFtn();
mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app")
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {});

app.use(
  session({
    secret: "b-a-s-k",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient()
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post("/auth/login", (req, res, next) => {
  // console.log("/auth/login called", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message ?? "Invalid credentials" });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.status(200).json({ message: "Successfully logged in" });
    });
  })(req, res, next);
});

app.post("/create-blog", async (req, res) => {
  const body = req.body;
  const { banner, title, content, desc } = body;

  if (!banner || !title || content.length === 0 || !desc) {
    return res.status(400).json({ message: "Input field is missing" });
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const extractingNameAndUserId = await User.findOne({
      _id: req.user._id
    });

    if (!extractingNameAndUserId) {
      return res.status(404).json({ message: "User not found" });
    }

    const saveData = {
      banner,
      title,
      content,
      desc,
      author: extractingNameAndUserId.name,
      userId: extractingNameAndUserId._id
    };
    const blog = new Blog(saveData);
    const newBlog = await blog.save();

    return res.status(201).json({ message: newBlog });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/blogs", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "You are unauthorized" });
  }

  try {
    const blogs = await Blog.find();
    if (blogs.length === 0) {
      return res.status(200).json({ message: [], info: "No blogs yet" });
    }

    return res.status(200).json({ message: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  if (!req.user) {
    return res.status(401).json({ message: "You are unauthorized" });
  }

  try {
    const getBlog = await Blog.findById({ _id: id });
    if (!getBlog) {
      return res.status(404).json({ message: "Blog id not found" });
    }

    return res.status(200).json({ message: getBlog });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/auth/create-account", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: "Email, name and password are required" });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { name }]
  });

  if (existingUser) {
    return res.status(400).json({
      error: "Email or name already exists"
    });
  }

  const hashedPassword = await hashPasswordFtn(password);
  if (!hashedPassword) {
    return res.status(500).json({ error: "Error hashing password" });
  }

  const user = new User({
    email,
    password: hashedPassword,
    name
  });

  const savedUser = await user.save();

  res.status(201).json({ user: savedUser });
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

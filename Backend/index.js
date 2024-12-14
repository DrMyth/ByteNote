const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config.json");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const { userModel } = require("./models/user.model");
const { noteModel } = require("./models/note.model");

mongoose.connect(config.connectionString);

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({
    data: "Hello World",
  });
});

//SignUp Endpoint
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({
      error: true,
      message: "Full Name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }

  const isUser = await userModel.findOne({ email: email });

  if (isUser) {
    return res.status(400).json({
      error: true,
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    fullName: fullName,
    email,
    password,
  });

  const accessToken = jwt.sign(
    {
      email: email,
      _id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "36000m",
    }
  );

  res.json({
    error: false,
    user: user,
    accessToken: accessToken,
    message: "Registration Successfully",
  });
});

//Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }

  const userInfo = await userModel.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({
      error: true,
      message: "User not found",
    });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const accessToken = jwt.sign(
      { email: email, _id: userInfo._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "36000m" }
    );
    return res.json({
      error: false,
      message: "Login successfully",
      accessToken: accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

//Get User Info Endpoint
app.get("/get-user", authenticateToken, async (req, res) => {
  const user = req.user;
  
  try {
    const isUser = await userModel.findOne({ _id: user._id },{ password:0, createdOn:0, __v: 0});

    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      error: false,
      user: isUser,
      message: "User fetched successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while fetching user",
    });
  }
});

//Add Note Endpoint
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });
  }

  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Content is required",
    });
  }

  if (!tags) {
    return res.status(400).json({
      error: true,
      message: "Tags is required",
    });
  }

  try {
    const note = await noteModel.create({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    return res.status(200).json({
      error: false,
      message: "Note added successfully",
      note: note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while adding note",
    });
  }
});

//Edit Note Endpoint
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title & !content & !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes found!",
    });
  }

  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      message: "Note updated successfully",
      note: note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while updating note",
    });
  }

});

//Get All Notes Endpoint
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const user = req.user;

  try {
    const notes = await noteModel
      .find({ userId: user._id })
      .sort({ isPinned: -1 });

    return res.status(200).json({
      error: false,
      notes: notes,
      message: "Notes fetched successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while fetching notes",
    });
  }
});

//Delete Note Endpoint
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;

  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });
    }

    await noteModel.deleteOne({ _id: noteId, userId: user._id });
    return res.status(200).json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while deleting note",
    });
  }
});

//Update isPinned Endpoint
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const user = req.user;
  const { isPinned } = req.body;
  const noteId = req.params.noteId;

  if (isPinned == undefined) {
    return res.status(400).json({
      error: true,
      message: "isPinned status is required",
    });
  }

  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });
    }

    note.isPinned = isPinned;
    await note.save();
    return res.status(200).json({
      error: false,
      message: "Note pinned status updated successfully",
      note: note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while updating pinned status",
    });
  }
});

//Search Notes Endpoint
app.get("/search-notes", authenticateToken, async (req, res) => {
  console.log(req.user);
  const user = req.user;
  const {query} = req.query;
  console.log(user);

  if(!query){
    return res.status(400).json({
      error: true,
      message: "Query is required"
    });
  }

  try{
    const matchingNotes = await noteModel.find({
      userId: user._id,
      $or:[
        {title: {$regex: new RegExp(query, "i")}},
        {content: {$regex: new RegExp(query, "i")}},
      ],
    });

    return res.status(200).json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully"
    });

  } catch(e){
    console.log(e);
    return res.status(400).json({
      error: true,
      message: "Error while searching notes"
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

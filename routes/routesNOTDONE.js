const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Team = require("../models/team");
const UserFile = require("../models/userfile");

app.use(cors());
//INDEX
const dbPass= "xzUkudPgu0FIiNMn"

mongoose.connect('mongodb+srv://dbUser:' + dbPassword + '@cluster0.xanc4.mongodb.net/cddb?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
//INDEX
let currentUser = {
  user_id: null,
  username: null,
  email: null,
  pw_hash: null,
  files : null,
  cotwo_weekly : null,
  cotwo_total : null,
  team_id : null
};

router.get("/:username/files", (req, res, next) => {
  const { username } = req.params;
  User.findOne({
    username
  })
    .then(user => {
      File.find({
        owner_id: user._id
      })
        .then(files => {
          res.status(200).json({
            response: files
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.get("/:username/keep", (req, res, next) => {
  
  User.findOne({
    username: req.params.username
  })
    .exec()
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: "user non existent" });
      } else {
        UserFile.updateOne({
          owner_id : User.findOne({username : req.params.username}),
          filename : req.params.filename
        },  { modified_date : new Date().format('m-d-Y h:i:s') })
          .exec()
          .then(result => {
            res.status(200).json({
              result
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/:username/delete", (req, res, next) => {
  
  User.findOne({
    username: req.params.username
  })
    .exec()
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: "user non existent" });
      } else {
        UserFile.deleteOne({
          owner_id : User.findOne({username : req.params.username}),
          filename : req.params.filename
        })
          .exec()
          .then(result => {
            res.status(200).json({
              result
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


/*
router.get("/", (req, res, next) => {
  if (!currentUser._id) {
    // user is not logged -> redirect to public
    res.redirect("/public");
  } else {
    Follower.findOne({
      who_id: currentUser._id
    })
      .then(followerUser => {
        if (followerUser == null) {
          // display own messages
          Message.find({
            author_id: currentUser._id
          }).then(messages => {
            res.status(200).json({
              result: messages
            });
          });
        } else {
          // display own+follower messages
          Promise.all([
            Message.find({
              author_id: currentUser._id
            }),
            Message.find({
              author_id: followerUser.whom_id
            })
          ])
            .then(messages => {
              res.status(200).json({
                result: Array.prototype.concat.apply([], messages)
              });
            })
            .catch(err => {
              res.status(500).json({
                err
              });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
});

router.get("/public", (req, res, next) => {
  Message.find()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:username", (req, res, next) => {
  const { username } = req.params;
  User.findOne({
    username
  })
    .then(user => {
      Message.find({
        author_id: user._id
      })
        .then(userMessages => {
          res.status(200).json({
            response: userMessages
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:username/follow", (req, res, next) => {
  const usernameToFollow = req.params.username;
  User.findOne({
    username: usernameToFollow
  })
    .exec()
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: "username to follow non existent" });
      } else {
        const newFollower = new Follower({
          who_id: currentUser._id,
          whom_id: user._id
        });
        newFollower
          .save()
          .then(result => {
            res.status(200).json({
              result
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:username/unfollow", (req, res, next) => {
  const usernameToFollow = req.params.username;
  User.findOne({
    username: usernameToFollow
  })
    .exec()
    .then(user => {
      if (user == null) {
        res.status(404).json({ message: "username to unfollow non existent" });
      } else {
        Follower.findOneAndDelete({
          who_id: currentUser._id,
          whom_id: user._id
        })
          .then(result => {
            res.status(200).json({
              result
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/add_message", (req, res, next) => {
  const newMessage = new Message({
    message_id: new mongoose.Types.ObjectId(),
    author_id: currentUser._id,
    text: req.body.text,
    pub_date: new Date(),
    flagged: req.body.flagged
  });
  newMessage
    .save()
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  User.find({
    username
  })
    .then(user => {
      if (user.length < 1) {
        res.status(401).json({ message: "Auth failed" });
      } else {
        bcrypt.compare(password, user[0].pw_hash, (err, result) => {
          if (err || !result) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            // const token = jwt.sign({
            //     username: user[0].username,
            //     _id: user[0]._id
            // }, "jwt_pw", {
            //     expiresIn:"1h"
            // })
            currentUser = user[0];
            return res.status(200).json({
              message: "Auth successful"
              // token: token
            });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/register", (req, res, next) => {
  User.find({
    username: req.body.username
  }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "username already exists"
      });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        pw_hash: hash
      });
      newUser
        .save()
        .then(result => {
          res.status(200).json({
            result: result
          });
        })
        .catch(err =>
          res.status(500).json({
            error: err
          })
        );
    });
  });
});

router.get("/logout", (req, res, next) => {
  currentUser = null;
  res.status(200).json({ response: "user logged out" });
});

*/
module.exports = router;

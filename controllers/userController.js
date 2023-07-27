const UserSchema = require('../models/userModel');
const QuestSchema = require('../models/questModel');
const LogSchema = require('../models/questLogs')
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = '5f14a0f6e297f4a1f8d81932b4ebe57c0e3a5e5e36929c2670e888cfb8f7e203'; // Replace with your own secret key
const { spawn } = require('child_process');

//Auth the user
const AuthUser = async (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  var discordID = req.body.discordID;
  var avatarID = req.body.avatarID;
  console.log('Creating user');
  console.log(userName);
  console.log(avatarID);

  //post to db
  try {
    //check if uname already exists
    const checkuname = await UserSchema.find({ userName: userName });
    if (checkuname.length != 0) {
      console.log('username exists');

      const updateUserSchema = await UserSchema.findOneAndUpdate(
        { _id: checkuname._id },
        { userName: userName, discordID: discordID, avatarID: avatarID },
      );
      //jwt token gen
      console.log(checkuname._id);
      console.log(checkuname);
      const token = jwt.sign({ data: checkuname }, secretKey);
      return res.status(400).json({ isUnameExist: true, token: token });
    } else {
      const userdata = await UserSchema.create({
        userName: userName,
        discordID: discordID,
        avatarID: avatarID,
      });
      //jwt auth
      console.log(typeof userdata);
      console.log(userdata);
      const token = jwt.sign({ data: userdata }, secretKey);
      console.log(token);
      return res.json({ token: token });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

//verify jwt token
const VerifyToken = async (req, res) => {
  token = req.body.token;
  //verify jwt token
  try {
    const verified = jwt.verify(token, secretKey);
    if (verified) {
      try {
        const findUser = await UserSchema.find({ _id: verified._id });
        const bot = spawn('node', [__dirname + '/src/webbot.js']);
        bot.send('trigger-event');
        return res.status(200).json(findUser);
      } catch {
        return res.status(400);
      }
    } else {
      console.log('failed to verify');
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


//receive active users
const activeUsers = async (req, res) => {
  var uname = req.body.uname;
  var userID = req.body.userID;
  var avatarID = req.body.avatarID
  var status = req.body.action

  console.log(status)

  console.log(uname, avatarID);
  try {
    await UserSchema.findOneAndUpdate({ _id: userID }, { isOnline: true });
    return res.status(200)
  } catch (err) {
    console.log(err);
    return res.status(404)
  }
}

//send active users
const SendActiveUsers = async (req, res) => {
  try {
    const onlineUsers = await UserSchema.find({ isOnline: true });
    console.log(onlineUsers)
    return res.send({ userLis: onlineUsers })

  } catch (err) {
    console.log(err);
    return res.status(404)
  }

}

//store quests
const StoreQuest = async (req, res) => {
  var userID = req.body.userID;
  var Quest = req.body.Quest;
  console.log(userID);
  const quest = await QuestSchema.create({
    ID: userID,
    Quest: Quest,
    isChecked: false,
  });
  return res.status(200).json(quest);
};

//setting quest order
const SetOrder = async (req, res) => {
  const updatedOrderData = req.body.data;
  // var questID = req.body.questID
  // var order = req.body.order
  for (let i = 0; i < updatedOrderData.length; i++) {
    try {
      await QuestSchema.findOneAndUpdate({ _id: updatedOrderData[i].questID }, { order: updatedOrderData[i].order });
      continue;
    } catch (err) {
      console.log(err);
      break;
    }
  }
  const findQuest = await QuestSchema.find({ ID: userID });
  return res.status(200).json(findQuest);
};

//fetch quests
const FetchQuest = async (req, res) => {
  var userID = req.body.userID;
  try {
    const findQuest = await QuestSchema.find({ ID: userID });
    return res.status(200).json(findQuest);
  } catch {
    return res.status(400).json({ doesNotexist: true });
  }
};
//delete quests
const DeleteQuest = async (req, res) => {
  var questID = req.body.questID;
  try {
    const deleteQuest = await QuestSchema.findByIdAndDelete({ _id: questID });
    return res.status(200).json(deleteQuest);
  } catch {
    return res.status(400).json({ doesNotexist: true });
  }
};

//mark quests
const MarkQuest = async (req, res) => {
  var questID = req.body.questID;
  try {
    const updatemode = await QuestSchema.findOneAndUpdate({ _id: questID }, { isChecked: true });

    return res.status(200).json({ questChecked: true });
  } catch {
    return res.status(400).json({ questChecked: false });
  }
};


// store logs

const StoreLogs = async (req, res) => {
  var userid = req.body.userid;
  var name = req.body.name;
  var state = req.body.state;
  console.log(userid);
  console.log(name);
  console.log(state);
  const log = await LogSchema.create({
    USERID: userid,
    Name: name,
    state: state,

  });
  return res.status(200).json(log);
};


//fetch quests
const FetchLogs = async (req, res) => {
  var userID = req.body.userid;
  try {
    const findlogs = await LogSchema.find({ USERID: userID });
    console.log(findlogs)
    return res.status(200).json(findlogs);
  } catch {
    return res.status(400).json({ doesNotexist: true });
  }
};

module.exports = {
  AuthUser,
  VerifyToken,
  StoreQuest,
  SetOrder,
  FetchQuest,
  DeleteQuest,
  MarkQuest,
  activeUsers,
  SendActiveUsers,
  StoreLogs,
  FetchLogs
};

const UserSchema = require('../models/userModel');
const QuestSchema = require('../models/questModel');
const LogSchema = require('../models/questLogs')
const PlaylistSchema = require('../models/playlistModel');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = '5f14a0f6e297f4a1f8d81932b4ebe57c0e3a5e5e36929c2670e888cfb8f7e203'; // Replace with your own secret key

const { getClient } = require('../utils/utils.js');

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
        { _id: checkuname[0]._id },
        { userName: userName, discordID: discordID, avatarID: avatarID },
      );
      //jwt token gen
      console.log(checkuname[0]._id);
      console.log(checkuname);
      const token = jwt.sign({ data: checkuname }, secretKey);

      const msg = `existing user came back ${checkuname[0].userName}`
      //log in discord bot
      setTimeout(() => {
        console.log("sending to bot")
        sendToDiscord(msg)
      }, 3000);

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


      const msg = `welcome new user ${userName}`
      //log in discord bot
      setTimeout(() => {
        console.log("sending to bot")
        sendToDiscord(msg)
      }, 3000);

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
        console.log("verified user")
        console.log(findUser.userName)
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


async function sendToDiscord(message) {
  try {
    const client = getClient(); // Retrieve the client object from utils.js
    const channel = "1129262390681284628"; // Replace with your actual Discord channel ID

    const discordChannel = await client.channels.fetch('1129262390681284628');
    console.log(discordChannel)
    if (!discordChannel) {
      console.error(`Channel with ID ${channel} not found.`);
      return;
    }
    await discordChannel.send(message);
  } catch (error) {
    console.error('Error sending message to Discord:', error);
  }
}



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

//store playlist
const StorePlaylist = async (req, res) => {
  try {
    var userID = req.body.userID;
    var playlistData = req.body.playlist;
    const playlist = await PlaylistSchema.create({
      ID: userID,
      ...playlistData,
    });
    return res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const GetPlaylist = async (req, res) => {
  try {
    var userID = req.body.userID;
    var playlistName = req.body.playlistName;
    if (playlistName) {
      // if a playlist name is provided, return the specific playlist
      const findPlaylist = await PlaylistSchema.findOne({ ID: userID, name: playlistName });

      if (findPlaylist) {
        // filter out quests that are not checked
        const uncheckedQuests = findPlaylist.quests.filter(quest => quest.isChecked === false);

        // replace the quests array with the filtered array
        findPlaylist.quests = uncheckedQuests;
      }
      return res.status(200).json(findPlaylist);
    } else {
      // if no playlist name is provided, return all playlists
      const findPlaylists = await PlaylistSchema.find({ ID: userID });
      return res.status(200).json(findPlaylists);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const DeletePlaylists = async (req, res) => {
  try {
    var userID = req.body.userID;
    const delPlaylists = await PlaylistSchema.deleteMany({ ID: userID });
    return res.status(200).json(delPlaylists);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const StorePlaylistQuest = async (req, res) => {
  try {
    var userID = req.body.userID;
    var playlistName = req.body.playlistName;
    var Quest = req.body.Quest;

    // Find the playlist by its name and user ID
    var playlist = await PlaylistSchema.findOne({ ID: userID, name: playlistName });

    if (!playlist) {
      return res.status(400).json({ error: 'Playlist not found' });
    }

    // Create the new quest object
    const quest = new QuestSchema({
      ID: userID,
      Quest: Quest,
      isChecked: false,
    });

    // Add the new quest to the playlist's quests array
    playlist.quests.push(quest);

    // Save the updated playlist
    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

const MarkPlaylistQuest = async (req, res) => {
  //
  var playlistID = req.body.playlistID;
  var questID = req.body.questID;

  try {
    const updatedPlaylist = await PlaylistSchema.findOneAndUpdate(
      { _id: playlistID, 'quests._id': questID },
      { $set: { 'quests.$.isChecked': true } },
      { new: true },
    );

    if (!updatedPlaylist) {
      return res.status(500).json({ error: 'No matching playlist or quest found' });
    }

    return res.status(200).json(updatedPlaylist);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

const UpdatePlaylistQuests = async (req, res) => {
  var playlistID = req.body.playlistID;
  var updatedQuests = req.body.quests;

  try {
    const updatedPlaylist = await PlaylistSchema.findOneAndUpdate(
      { _id: playlistID },
      { $set: { quests: updatedQuests } }, // Here, we replace the old quests array with the new one.
      { new: true },
    );

    if (!updatedPlaylist) {
      return res.status(500).json({ error: 'No matching playlist or quest found' });
    }

    return res.status(200).json(updatedPlaylist);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
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
  FetchLogs,
  StorePlaylist,
  GetPlaylist,
  DeletePlaylists,
  StorePlaylistQuest,
  MarkPlaylistQuest,
  UpdatePlaylistQuests,
};

const QuestSchema = require('../models/questModel');

function handleError(error) {
  console.log(error);
  return res.status(400).json({ error: error });
}

const GetQuests = async (req, res) => {
  try {
    const { userID } = req.body;
    const findQuests = await QuestSchema.find({ ID: userID });
    return res.status(200).json(findQuests);
  } catch (error) {
    handleError(error);
  }
};

const CreateQuest = async (req, res) => {
  try {
    const { userID, questName, index } = req.body;

    const createdQuest = await QuestSchema.create({
      ID: userID,
      Quest: questName,
      isChecked: false,
      isDungeon: false,
      order: index,
    });

    return res.status(200).json(createdQuest);
  } catch (error) {
    handleError(error);
  }
};

const OrderQuests = async (req, res) => {
  const updatedQuests = req.body.updatedQuests;
  const userID = req.body.userID;

  console.log('updatedQuests', updatedQuests);

  for (let item of updatedQuests) {
    try {
      // Update each document based on the _id, setting the new order and isDungeon values
      await QuestSchema.findOneAndUpdate(
        { _id: item._id },
        { order: item.order, isDungeon: item.isDungeon },
        { new: true }, // option to return the updated document
      );
    } catch (err) {
      console.log(err);
      // If there is an error, send an error response
      return res.status(500).json({ error: 'Error updating quest order' });
    }
  }

  // Once all updates are complete, find and return the updated documents
  try {
    const findQuest = await QuestSchema.find({ ID: userID });
    return res.status(200).json(findQuest);
  } catch (err) {
    console.log(err);
    // If there is an error, send an error response
    return res.status(500).json({ error: 'Error finding quests' });
  }
};

module.exports = {
  GetQuests,
  CreateQuest,
  OrderQuests,
};

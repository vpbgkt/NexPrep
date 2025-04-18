const SubTopic = require('../models/SubTopic');

const addSubTopic = async (req, res) => {
  try {
    const { name, topicId } = req.body;
    const subTopic = new SubTopic({ name, topic: topicId });
    await subTopic.save();
    res.status(201).json({ message: 'Sub-topic added successfully', subTopic });
  } catch (error) {
    res.status(500).json({ message: 'Error adding sub-topic', error });
  }
};

const getAllSubTopics = async (req, res) => {
  try {
    const subTopics = await SubTopic.find();
    res.status(200).json(subTopics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-topics', error });
  }
};

module.exports = {
  addSubTopic,
  getAllSubTopics,
};

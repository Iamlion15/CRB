const CollateralModal = require("../model/collateralStatusModel");
const ConsumerModal=require("../model/consumerStatusModel")
const corporateModal=require("../model/corporateStatusModel")

exports.initialiseCollateral = async (req, res) => {
    try {
        
        const deleteResult = await CollateralModal.deleteMany({});
        console.log(deleteResult)
        if (deleteResult.acknowledged === true) {
            res.status(200).json({ message: "All documents deleted successfully." });
        } else {
            res.status(400).json({ error: "Failed to delete documents." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.initialiseCorporate = async (req, res) => {
    try {
        
        const deleteResult = await corporateModal.deleteMany({});
        console.log(deleteResult)
        if (deleteResult.acknowledged === true) {
            res.status(200).json({ message: "All documents deleted successfully." });
        } else {
            res.status(400).json({ error: "Failed to delete documents." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.initialiseConsumer = async (req, res) => {
    try {
        
        const deleteResult = await ConsumerModal.deleteMany({});
        console.log(deleteResult)
        if (deleteResult.acknowledged === true) {
            res.status(200).json({ message: "All documents deleted successfully." });
        } else {
            res.status(400).json({ error: "Failed to delete documents." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const ConsumerModal = require("../model/consumerStatusModel")
const axios = require("axios")
const dotenv = require("dotenv").config()

exports.SaveStatus = async (req, res) => {
    const { accountNumber, status, errorData } = req.body;

    try {
        const collateralObject = {
            accountNumber,
            status,
            errorData:[]
        };

        if (errorData) {
            collateralObject.errorData = errorData;
        }
        const response = await ConsumerModal.findOneAndUpdate(
            { accountNumber },
            { $set: collateralObject },
            { upsert: true, new: true }
        );

        if (response) {
            res.status(200).json({ message: "Saved/Updated" });
        } else {
            res.status(400).json({ error: "Failed to save/update" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


exports.readErrorStatus = async (req, res) => {
    try {
        const errorReport = await ConsumerModal.find({ status: "failed" })
        res.status(200).json(errorReport)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}


exports.readStatus = async (req, res) => {
    const acNumber = req.params.accountnumber
    try {
        const response = await ConsumerModal.findOne({ accountNumber: acNumber })
        if (response === null) {
            return res.status(404).json({ message: "not found" })
        }
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json({ error: err })

    }
};


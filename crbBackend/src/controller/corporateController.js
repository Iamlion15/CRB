const CorporateModal = require("../model/corporateStatusModel")
const axios = require("axios")
const dotenv = require("dotenv").config()

exports.SaveStatus = async (req, res) => {
    const { accountNumber, status, errorData,errorMessage } = req.body;

    try {
        const corporateObject = {
            accountNumber,
            status,
            errorData:[]
        };

        if (errorData) {
            corporateObject.errorInformationMessage=errorMessage
            corporateObject.errorData = errorData;
        }
        const response = await CorporateModal.findOneAndUpdate(
            { accountNumber },
            { $set: corporateObject },
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
        const errorReport = await CorporateModal.find({ status: "failed" })
        res.status(200).json(errorReport)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}


exports.readStatus = async (req, res) => {
    const acNumber = req.params.accountnumber
    try {
        const response = await CorporateModal.findOne({ accountNumber: acNumber })
        if (response === null) {
            return res.status(404).json({ message: "not found" })
        }
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json({ error: err })

    }
};


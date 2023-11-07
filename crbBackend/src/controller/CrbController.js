const CrbModel = require("../model/collateralStatusModel")
const axios = require("axios")
const dotenv = require("dotenv").config()

exports.SaveCollateralStatus = async (req, res) => {
    const { loanId, status, collateralId, errorData } = req.body;

    try {
        // Define the update object based on whether error data is present
        const updateObject = {
            loanId,
            status,
            collateralId,
        };

        if (errorData) {
            // Include error data if it is present
            updateObject.errorData = errorData;
        }

        // Use findOneAndUpdate with upsert option to handle duplicates
        const response = await CrbModel.findOneAndUpdate(
            { collateralId },
            { $set: updateObject },
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


exports.logincrb = async (req, res) => {
    try {
        // console.log(process.env.username)
        const data = {
            username: process.env.loginname,
            password: process.env.password,
            infinityCode: process.env.infinityCode
        }
        const response = await axios.post("https://secure3.crbafrica.com/duv2/login", data)
        res.status(200).json({ "token": response.data.token })
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}



exports.readCollateralErrorStatus = async (req, res) => {
    try {
        console.log("hello");
        const errorReport = await CrbModel.find({ status: "failed" })
        console.log(errorReport)
        res.status(200).json(errorReport)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err })
    }
}


exports.readCollateralStatus = async (req, res) => {
    const corpo = req.params.collateralid
    try {
        const response = await CrbModel.findOne({ collateralId: collateralid })
        if (response === null) {
            return res.status(404).json({ message: "not found" })
        }
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json({ error: err })

    }
};


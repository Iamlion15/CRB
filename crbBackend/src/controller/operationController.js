const CollateralModal = require("../model/collateralStatusModel");

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

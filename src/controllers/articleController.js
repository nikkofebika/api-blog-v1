const articleModel = require("../models/articleModel");
exports.getAll = async (req, res, next) => {
    await articleModel.getAll().then(result => {
        res.status(200).json({
            data: result
        })
    }).catch(error => {
        const err = new Error('Error articleController getAll :');
        err.errorStatus = 501;
        err.data = error;
        throw next(err);
    })
}
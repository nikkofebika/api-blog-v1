const subcategoryModel = require("../models/subcategoryModel");

exports.getAll = async (req, res, next) => {
    await subcategoryModel.getAll().then(result => res.status(200).json({ data: result })).catch(error => {
        const err = new Error('Error subcategoryController getAll :');
        err.statusCode = 501;
        err.data = error;
        throw next(error);
    })
}
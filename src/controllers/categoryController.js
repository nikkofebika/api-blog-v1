const categoryModel = require("../models/categoryModel");

exports.getAll = async (req, res, next) => {
    await categoryModel.getAll().then(result => res.status(200).json({ data: result })).catch(error => {
        const err = new Error('Error categoryController getAll :');
        err.statusCode = 501;
        err.data = error;
        throw next(error);
    })
}
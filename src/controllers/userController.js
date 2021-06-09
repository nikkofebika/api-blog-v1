const userModel = require('../models/user')
exports.getAll = (req, res, next) => {
    userModel.getAll((error, results) => {
        console.log('userController');
        if (error) {
            res.json(error)
        }
        res.json(results)
    })
}
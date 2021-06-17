const connection = require('../config/database');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM categories", (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    })
}
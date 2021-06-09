const connection = require("../config/database");

exports.getAll = (res) => {
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log(results)
    });
}
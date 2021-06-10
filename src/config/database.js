const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api-blog-v1',
})

connection.connect((err) => {
    if (err) {
        console.log('Error Database connection : ', err.code);
        return;
    }

    console.log('connected as id ' + connection.threadId);
})
module.exports = connection;
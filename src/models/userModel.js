const { resolve } = require("path");
const connection = require("../config/database");
// exports.getAll = (callback) => {
//     connection.query('SELECT * FROM users', function (error, results) {
//         if (error) {
//             console.log('error userModel : ', error);
//             callback(error, null)
//         };
//         console.log('success userModel : ', results);
//         callback(null, results)
//     });
// }
// exports.cekExistingEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT email FROM users WHERE email = ?", email, (error, result) => {
//       if (error) {
//         console.log('masuk model error')
//         return reject(error)
//       };
//       console.log('masuk model success')
//       return resolve(true);
//     })
//   })
// }
exports.getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ? ",
      id,
      function (error, results) {
        if (error) return reject(error);
        return resolve(results[0]);
      }
    );
  });
};

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users SET ?",
      data,
      function (error, results) {
        if (error) return reject(error);
        return resolve({
          insertId: results.insertId,
          data: data,
        });
      }
    );
  });
};

exports.update = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET ?, updated_at = NOW() WHERE id = ?",
      [data, id],
      function (error, results) {
        if (error) return reject(error);
        return resolve(data);
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ? ",
      id,
      function (error, results) {
        if (error) return reject(error);
        // return resolve(results);
        const user = results[0];
        connection.query(
          "DELETE FROM users WHERE id = ? ",
          id,
          function (error, results) {
            if (error) return reject(error);
            return resolve(user);
          }
        );
      }
    );
  });
};

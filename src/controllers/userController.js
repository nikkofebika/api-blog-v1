const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const path = require("path");
const fs = require("fs");

exports.getAll = async (req, res, next) => {
  try {
    console.log("req.query", req.query);
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 3;
    const offset = (currentPage - 1) * perPage;
    const users = await userModel.getAll(perPage, offset);
    console.log("users", users);
    res.status(200).json({
      message: "Blogs successfully called",
      data: users[0],
      total_data: users[1],
      current_page: currentPage,
      per_page: perPage,
    });
    // res.status(200).json(users);
  } catch (error) {
    const err = new Error("error userController getAll : ");
    err.errorStatus = 501;
    err.data = error;
    throw next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const users = await userModel.getById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    const err = new Error("error userController getById : ");
    err.errorStatus = 501;
    err.data = error;
    throw next(err);
  }
};

exports.create = async (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    console.log("validation", validation);
    const err = new Error("Wrong Input valueeee");
    err.errorStatus = 400;
    err.data = validation.array();
    throw next(err);
  }

  if (!req.file) {
    const err = new Error("Gambar harus diupload");
    err.errorStatus = 422;
    throw next(err);
  }
  const data = {
    name: req.body.name,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    image: req.file.path,
  };

  try {
    const user = await userModel.create(data);
    res.status(200).json({
      message: "user created successfully",
      insertId: user.insertId,
      data: user.data,
    });
  } catch (error) {
    const err = new Error("error userController create : ");
    err.errorStatus = 501;
    err.data = error;
    throw next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await userModel.getById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.errorStatus = 501;
      return next(err);
    }

    const data = req.body;
    if (req.file) {
      data["image"] = req.file.path;
      console.log("update file : ", req.file);
    }
    await userModel
      .update(data, req.params.id)
      .then((result) => {
        removeFile(user.image);
        res.status(200).json({
          message: "user updated successfully",
          data: result,
        });
      })
      .catch((error) => {
        const err = new Error("error userController update : ");
        err.errorStatus = 501;
        err.data = error;
        throw next(err);
      });
  } catch (error) {
    const err = new Error("error userController getById : ");
    err.errorStatus = 501;
    err.data = error;
    throw next(err);
  }
};

exports.delete = async (req, res, next) => {
  await userModel
    .delete(req.params.id)
    .then((result) => {
      removeFile(result.image);
      res.status(200).json({
        message: "user deleted successfully",
        data: result,
      });
    })
    .catch((error) => {
      const err = new Error("error userController delete : ");
      err.errorStatus = 501;
      err.data = error;
      throw next(err);
    });
};

const removeFile = (filePath) => {
  filePath = path.join(__dirname, "../../", filePath);
  if (fs.existsSync(filePath))
    fs.unlink(filePath, (err) =>
      console.log("error remove file userController", err)
    );
};

// exports.getAll = (req, res, next) => {
//     userModel.getAll((error, results) => {
//         if (error) {
//             // console.log('error userController : ', error);
//             res.json(error)
//         }
//         // console.log('success userController : ', results)
//         res.status(200).json(results)
//     })
// }
// exports.cekExistingEmail = async (req, res, next) => {
//   await userModel.cekExistingEmail(req).then(result => {
//     // console.log('result controller email ', result);
//     // return new Promise((resolve, reject) => {
//     //   return resolve(result)
//     // });
//     // return Promise.reject('E-mail already in use');
//     // return result
//     return Promise.reject('User not available');
//     // res.status(400).json({
//     //   message: 'E-mail already in use'
//     // })
//   }).catch(error => {
//     const err = new Error("error userController cekExistingEmail : ");
//     err.errorStatus = 501;
//     err.data = error;
//     throw next(err);
//   })
// }

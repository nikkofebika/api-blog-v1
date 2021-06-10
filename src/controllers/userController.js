const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
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
exports.getAll = async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
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
    const err = new Error("Wrong Input value");
    err.errorStatus = 400;
    err.data = validation.array();
    throw next(err);
  }
  try {
    const user = await userModel.create(req.body);
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
  const data = req.body;
  //   data["updated_at"] = "NOW()";
  console.log("update controller : ", data);
  //   await userModel
  //     .update(data, req.params.id)
  //     .then((result) => {
  //       res.status(200).json({
  //         message: "user updated successfully",
  //         data: result,
  //       });
  //     })
  //     .catch((error) => {
  //       const err = new Error("error userController update : ");
  //       err.errorStatus = 501;
  //       err.data = error;
  //       throw next(err);
  //     });
};

exports.delete = async (req, res, next) => {
  await userModel
    .delete(req.params.id)
    .then((result) => {
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

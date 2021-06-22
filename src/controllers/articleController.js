const articleModel = require("../models/articleModel");
exports.getAll = async (req, res, next) => {
  await articleModel
    .getAll()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((error) => {
      const err = new Error("Error articleController getAll :");
      err.errorStatus = 501;
      err.data = error;
      throw next(err);
    });
};

exports.getBySeoTitle = async (req, res, next) => {
  await articleModel
    .getBySeoTitle(req.params.seo_title)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((error) => {
      const err = new Error("Error articleController getBySeoTitle :");
      err.errorStatus = 501;
      err.data = error;
      throw next(err);
    });
};

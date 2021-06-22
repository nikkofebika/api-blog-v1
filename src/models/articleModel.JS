const connection = require("../config/database");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT articles.*, DATE_FORMAT(articles.published_at, '%m-%d-%Y %H:%i') as published_at, categories.title as category_title, categories.seo_title as category_seo_title FROM articles JOIN categories ON categories.id=articles.category_id",
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
};

exports.getBySeoTitle = (seo_title) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT articles.*, categories.title as category_title, categories.seo_title as category_seo_title FROM articles JOIN categories ON categories.id=articles.category_id WHERE articles.seo_title = ? ",
      seo_title,
      (error, results) => {
        if (error) return reject(error);
        return resolve(results[0]);
      }
    );
  });
};

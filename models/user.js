const sqlite3 = require("sqlite3").verbose();
const res = require("express/lib/response");
const db = new sqlite3.Database("test.sqlite");

const sql =
  "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, age INT NOT NULL)";

db.run(sql);

class User {
  constructor() {}
  static async create(dataForm, cb) {
    try {

      const sql1 =
        "INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)";
      db.run(sql1, dataForm.name, dataForm.email, dataForm.password, dataForm.age, cb);
    } catch (error) {
      if (error) return next(error);
    }
  }

  static findByEmail(email, cb) {
    db.get("SELECT * FROM users WHERE email = ?", email, cb);
  }

  static authentificate(dataForm, cb) {
    User.findByEmail(dataForm.email, (error, user) => {
      if (error) return cb(error);
      if (!user) return cb();
    });
  }
}

module.exports = User;

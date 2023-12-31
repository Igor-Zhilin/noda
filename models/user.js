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
      if (dataForm.password.length < 5) {
        throw new Error('Пароль должен содержать не менее 5 символов');
      }
  
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
      if (!passwordRegex.test(dataForm.password)) {
        throw new Error('Пароль должен содержать хотя бы одну букву и одну цифру');
      }
  
      const sql = 'INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)';
      db.run(sql, [dataForm.name, dataForm.email, dataForm.password, dataForm.age], cb);
    } catch (error) {
      return cb(error);
    }
  }

  static findByEmail(email, cb) {
    db.get("SELECT * FROM users WHERE email = ?", email, cb);
  }

  static authentificate(dataForm, cb) {
    User.findByEmail(dataForm.email, (error, user) => {
      if (error) return cb(error);
      if (!user) return cb(); // Пользователь не найден
  
      if (dataForm.password !== user.password) {
        return cb(); // Неверный пароль
      }
  
      cb(null, user); // Аутентификация успешна
    });
  }
  
}

module.exports = User;

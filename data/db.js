//const mysql = require("mysql2");
const config = require("../config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);
connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("mysql bağlantısı başarılı.");
  } catch (error) {
    console.error("mysql bağlantı hatası", error);
  }
};

connectDatabase();

module.exports = sequelize;
// let connection = mysql.createConnection(config.db);

// connection.connect((err) => {
//   if (err) {
//     return console.log(err);
//   }
//   connection.query("select * from blog", (err, result) => {
//     //console.log(result);
//     //console.log(result[0]);
//     console.log(result[0].baslik);
//     //console.log(result[1].baslik);
//   });
//   console.log("mysql server bağlantısı yapıldı");
// });

// module.exports=connection.promise();

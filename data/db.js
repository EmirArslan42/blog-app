const mysql = require("mysql2");
const config = require("../config");

let connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    return console.log(err);
  }
  connection.query("select * from blog", (err, result) => {
    //console.log(result);
    //console.log(result[0]);
    console.log(result[0].baslik);
    //console.log(result[1].baslik);
  });
  console.log("mysql server bağlantısı yapıldı");
});

module.exports=connection.promise();
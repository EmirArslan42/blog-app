const { DataTypes, DATE } = require("sequelize");
const sequelize = require("./../data/db");

const Blog = sequelize.define("blog", {
  blogid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  baslik: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altBaslik: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aciklama: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resim: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ansayfa: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  onay: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sync = async () => {
  await Blog.sync({ alter: true });
  console.log("Blog tablosu eklendi");

  const count=await Blog.count();

  if(count==0){
    await Blog.create({
        baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
        altBaslik:
          "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir.",
        resim: "1.jpeg",
        ansayfa: true,
        onay: true,
        categoryid: 1,
      });
    
      await Blog.create({
        baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
        altBaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.",
        resim: "2.jpeg",
        ansayfa: true,
        onay: true,
        categoryid: 1,
      });
  }
};
sync();

module.exports = Blog;

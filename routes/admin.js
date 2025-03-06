const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/admin/blog/create", async (req, res) => {
  try {
    const categories = await db.execute("select * from category");
    res.render("admin/blog-create", {
      title: "Blog-Create",
      categories: categories[0],
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/blog/create", async (req, res) => {
  //console.log(req.body);
  const baslik = req.body.baslik;
  const aciklama = req.body.aciklama;
  const resim = req.body.resim;
  const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
  const onay = req.body.onay == "on" ? 1 : 0;
  const kategori = req.body.kategori;

  try {
    await db.execute(
      "insert into blog (baslik,aciklama,resim,anasayfa,onay,categoryid) values (?,?,?,?,?,?)",
      [baslik, aciklama, resim, anasayfa, onay, kategori]
    );
    res.redirect("/admin/blogs");
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin/blogs/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blogs = await db.execute("select * from blog where blogid = ?", [
      blogid,
    ]);
    const blog = blogs[0][0];
    const categories = await db.execute("select * from category");
    const category=categories[0];
    //console.log(categories[0][0]);
    if (blog) {
      return res.render("admin/blog-edit", {
        title: blog.baslik,
        blog: blog,
        categories: category,
      });
    } 
      res.redirect("/admin/blogs");
    
  } catch (error) {
    console.log(error);
  }
});
router.get("/admin/blogs", async (req, res) => {
  try {
    const blogs = await db.execute("select blogid,baslik,resim from blog");
    res.render("admin/blog-list", {
      title: "Blog-List",
      blogs: blogs[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

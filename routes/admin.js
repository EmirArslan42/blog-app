const express = require("express");
const router = express.Router();

const db = require("../data/db");
const imageUpload = require("../helpers/image-upload");
const fs = require("fs");

router.get("/admin/blog/delete/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blogs = await db.execute("select * from blog where blogid=?", [
      blogid,
    ]);
    const blog = blogs[0][0];
    res.render("admin/blog-delete", {
      title: "Blog-Delete",
      blog: blog,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/blog/delete/:blogid", async (req, res) => {
  const blogid = req.body.blogid;
  try {
    await db.execute("delete from blog where blogid=?", [blogid]);
    res.redirect("/admin/blogs?action=delete");
  } catch (error) {
    console.log(error);
  }
});
//* categories delete
router.get("/admin/category/delete/:categoryid", async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const categories = await db.execute(
      "select * from category where categoryid=?",
      [categoryid]
    );
    const category = categories[0][0];
    res.render("admin/category-delete", {
      title: "Category-Delete",
      category: category,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/category/delete/:categoryid", async (req, res) => {
  const categoryid = req.body.categoryid;
  try {
    await db.execute("delete from category where categoryid=?", [categoryid]);
    res.redirect("/admin/categories?action=delete");
  } catch (error) {
    console.log(error);
  }
});

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

router.post(
  "/admin/blog/create",
  imageUpload.upload.single("resim"),
  async (req, res) => {
    //console.log(req.body);
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const kategori = req.body.kategori;

    try {
      await db.execute(
        "insert into blog (baslik,altbaslik,aciklama,resim,anasayfa,onay,categoryid) values (?,?,?,?,?,?,?)",
        [baslik,altbaslik, aciklama, resim, anasayfa, onay, kategori]
      );
      console.log(resim);

      res.redirect("/admin/blogs?action=create");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/admin/category/create", async (req, res) => {
  try {
    res.render("admin/category-create", {
      title: "Category-Create",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/category/create", async (req, res) => {
  //console.log(req.body);
  const name = req.body.name;

  try {
    await db.execute("insert into category (name) values (?)", [name]);
    res.redirect("/admin/categories?action=create");
  } catch (error) {
    console.log(error);
  }
});
//* admin blogs
router.get("/admin/blogs/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blogs = await db.execute("select * from blog where blogid = ?", [
      blogid,
    ]);
    const blog = blogs[0][0];
    const categories = await db.execute("select * from category");
    const category = categories[0];
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

router.post(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("resim"),
  async (req, res) => {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;

    if (req.file) {
      resim = req.file.filename;

      fs.unlink("./public/images/" + req.body.resim,err => {
        console.log(err);
      });
    }

    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const kategoriid = req.body.kategori;

    try {
      await db.execute(
        "update blog set baslik=?,altbaslik=?,aciklama=?,resim=?,anasayfa=?,onay=?,categoryid=? where blogid=?",
        [baslik,altbaslik, aciklama, resim, anasayfa, onay, kategoriid, blogid]
      );
      res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
    } catch (error) {
      console.log(error);
    }
  }
);
//* admin categories
router.get("/admin/categories/:categoryid", async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const categories = await db.execute(
      "select * from category where categoryid = ?",
      [categoryid]
    );
    const category = categories[0][0];
    //console.log(categories[0][0]);
    if (category) {
      return res.render("admin/category-edit", {
        title: category.name,
        category: category,
      });
    }
    res.redirect("/admin/categories");
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/categories/:categoryid", async (req, res) => {
  const categoryid = req.body.categoryid;
  const name = req.body.name;

  try {
    await db.execute("update category set name=? where categoryid=?", [
      name,
      categoryid,
    ]);
    res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin/blogs", async (req, res) => {
  try {
    const blogs = await db.execute("select blogid,altbaslik,baslik,resim from blog");
    res.render("admin/blog-list", {
      title: "Blog-List",
      blogs: blogs[0],
      action: req.query.action,
      blogid: req.query.blogid,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await db.execute("select* from category");
    res.render("admin/category-list", {
      title: "Category-List",
      categories: categories[0],
      action: req.query.action,
      categoryid: req.query.categoryid,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

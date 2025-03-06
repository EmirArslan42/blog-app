const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryid", async (req, res)=>{
  const id = req.params.categoryid;
  try {
    const blogs = await db.execute("select * from blog where categoryid=?", [id]);
    const categories = await db.execute("select * from category");
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory:id,
    });

  } catch (error) {
    console.log(error);
  }
});

router.use("/blogs/:blogid", async (req, res) => {
  const id = req.params.blogid;
  try {
    const blog = await db.execute("select * from blog where blogid=?", [id]);
    if (blog[0][0]) {
      res.render("users/blog-details", {
        title: blog[0][0].baslik,
        blog: blog[0][0],
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

router.use("/blogs", async (req, res) => {
  try {
    const blogs = await db.execute("select * from blog where onay=1");
    const categories = await db.execute("select * from category");
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory:null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/", async (req, res) => {
  try {
    const blogs = await db.execute(
      "select * from blog where onay=1 and anasayfa=1"
    );
    const categories = await db.execute("select * from category");
    res.render("users/index", {
      title: "Popüler Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory:null,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

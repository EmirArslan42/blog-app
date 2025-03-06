const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use(adminRoutes);

app.use(userRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

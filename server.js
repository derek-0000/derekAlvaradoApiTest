const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const port = 3000;

let db = [
  {
    id: 0,
    name: "Test",
    lastName: "Test",
    email: "test1@email.com",
    password: "something",
  },
  {
    id: 1,
    name: "Test",
    lastName: "Test",
    email: "test2@email.com",
    password: "something",
  },
  {
    id: 2,
    name: "Test",
    lastName: "Test",
    email: "test3@email.com",
    password: "something",
  },
  {
    id: 3,
    name: "Test",
    lastName: "Test",
    email: "test4@email.com",
    password: "something",
  },
  {
    id: 4,
    name: "Test",
    lastName: "Test",
    email: "test5@email.com",
    password: "something",
  },
];

app.use(bodyParser.json({ limit: "100mb" }));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
});
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});
app.get("/get-all", (req, res) => {
  res.send(db);
});
app.get("/get-one/:id", (req, res) => { //Delete with the id in the url
  const params = req.params;
  const student = db.filter((student) => student.id == params.id);
  res.send(student);
});
app.put("/update", (req, res) => {
    const body = req.body
    const deleted = db.filter((student) => student.id != body.id);
    db = deleted
    db.push(body)
    res.send(body)
});
app.post("/post", (req, res) => {
    const student = req.body;
    db.push(student)
    res.send(db)
});
app.delete("/delete/:id", (req, res) => { //Delete with the id in the url
    const params = req.params;
    const deleted = db.filter((student) => student.id != params.id);
    db = deleted
    res.send(db)
});
app.post("/register",async (req, res) => {
    const body = req.body
    const hash = await bcrypt.hash(body.password, 10)
    req.body.password = hash
    db.push(body)
    res.send(db)
});
app.post("/login", async(req, res,next) => {
    const body = req.body
    const getStudent = db.filter(student => student.email == body.email)
    const compare = await bcrypt.compare(body.password, getStudent[0].password)
    if(compare == true){
        return res.status(200).send({
            success:true,
            message:"Logged in"
        })
      }else{
        return next(Error('UnauthorizedError'))
      }
});

app.listen(port, (req, res) => {
  console.log(`App listening in port ${port}`);
});

const express = require("express");
const fs = require("fs")
const mongoose = require ("mongoose")
const users = require("./MOCK_DATA.json");
const { error } = require("console");
const { default: nodemon } = require("nodemon");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile('log.txt', `\n${Date.now()}:${req.ip} :${req.method} :${req.path}\n`, (err, data) => {
    next()
  })
  req.myUserName = "bilal.bec";
  next()
})




//Routes
app.get('/users', (req, res) => {
  const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>` ;
  res.send(html)
});

app.get("/api/users", (req, res) => {
  res.setHeader("myName", "Bilal kahn")
  return res.json(users);
});


app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).json({ error: 'user not found' });
  return res.json(user);
}).patch((req, res) => {
  //  Edit the user with id
  return res.json({ status: "padding" });
})
  .delete((req, res) => {
    //  delete the user with id
  });



app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.Job_title
  ) {
    return res.status(400).json({ msg: "All fields are req... " });
  }
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });

});




app.listen(PORT, () => console.log(`Server Started! at port:${PORT}`))
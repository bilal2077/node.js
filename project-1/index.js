
const fs = require("fs")

const { error, timeStamps } = require("console");
const { default: nodemon } = require("nodemon");

const app = express();
const PORT = 8000;

// Connection
mongoose.connect('mongodb://localhost:27017/BilalUsman')
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error",err))



// Middwear
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile('log.txt', `\n${Date.now()}:${req.ip} :${req.method} :${req.path}\n`, (err, data) => {
    next()
  })
  req.myUserName = "bilal.bec";
  next()
})




//Routes
app.get('/users', async(req, res) => {
  const allDBUsers= await User.find({});
  const html = `
    <ul>
    ${allDBUsers.map((user) => `<li>${user.first_name} _  ${user.email}</li>`).join("")}
    </ul>` ;
  res.send(html)
});

app.get("/api/users", async(req, res) => {
  const allDBUsers= await User.find({});
  return res.json(allDBUsers);
});


app.route("/api/users/:id").get(async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'user not found' });
  return res.json(user);
})
.patch(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { last_name:'Changed'});
  //  Edit the user with id
  return res.json({ status: "Success" });
})
  .delete(async (req, res) => {
 await User.findByIdAndDelete(req.params.id);
 return res.json({ status: "Success" });
    //  delete the user with id
  });



app.post("/api/users", async (req, res) => {
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
  
  const result = await User.create({ 
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    Job_title: body.Job_title,
   });

 return res.status(201).json({msg: 'succcess'})
});




app.listen(PORT, () => console.log(`Server Started! at port:${PORT}`))  us         
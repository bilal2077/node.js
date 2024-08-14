const express = require("express");

const router = express.Router();

//Routes

  router.get("/", async(req, res) => {
    const allDBUsers= await User.find({});
    return res.json(allDBUsers);
  });
  
  
  router.route("/:id").get(async(req, res) => {
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
  
  
  
    router.post("/", async (req, res) => {
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


    module.exports = router;
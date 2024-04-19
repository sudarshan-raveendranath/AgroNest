const router = require("express").Router();
let Farmer = require("../../models/Thisaravi/Farmer");

router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const district = req.body.district;
    const city = req.body.city;
    const userName = req.body.userName;
    const password = req.body.password;

    const newFarmer = new Farmer({

        first_name,
        last_name,
        email,
        phone,
        district,
        city,
        userName,
        password
    })

    newFarmer.save().then(()=>{
        res.json("Farmer Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Farmer.find().then((farmers)=>{
        res.json(farmers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:farmerID").put(async(req,res)=>{
    let userId = req.params.farmerID;
    const{first_name, last_name, email, phone, district, city, userName,password} = req.body;

    const updateFarmer ={
        first_name,
        last_name,
        email,
        phone,
        district,
        city,
        userName,
        password
    }

    const update = await Farmer.findByIdAndUpdate(userId,updateFarmer).then(()=>{
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })

})

router.route("/delete/:farmerID").delete(async(req,res)=>{
    let userId = req.params.farmerID;
    
    await Farmer.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

router.route("/get/:farmerID").get(async(req,res)=>{
    let userId = req.params.farmerID;
    const user = await Farmer.findById(userId)
    .then((farmer)=>{
        res.status(200).send({status: "User fetched", farmer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})

//Oshini
router.route("/getName/:farmerID").get(async (req, res) => {
    try {
      const userId = req.params.farmerID;
      const farmer = await Farmer.findById(userId);
      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      const fullName = `${farmer.first_name} ${farmer.last_name}`;
      res.status(200).json({ fullName });
    } catch (error) {
      console.error("Error fetching farmer name:", error);
      res.status(500).json({ message: "Failed to fetch farmer name. Please try again later." });
    }
  });
  

module.exports = router;
const express = require('express');
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");
const Usermodel = require('./models/user');
const Remindermodel=require('./models/medicines');

const cors=require("cors");
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://navyaknair9:3veni@cluster0.qtmgwsg.mongodb.net/meditrack?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
},);

//loop that checks reminder if any for each 1 sec interval

// setInterval(async () => {
//   try {
//     const reminderList = await Remindermodel.find({}).exec();
//     if (reminderList) {
//       reminderList.forEach(async (reminder) => {
//         if (!reminder.isReminded) {
//           const now = new Date();
//           if (new Date(reminder.reminderAt) - now < 0) {
//             await Remindermodel.findByIdAndUpdate(
//               reminder._id,
//               { isReminded: true }
//             ).exec();

//             const accountSid = "AC06591a33714074af78e52d971b9f6ec3";
//             const authToken = "d7657473aa4742b62e34ce7198c1b664";
//             const client = require("twilio")(accountSid, authToken);

//             client.messages
//               .create({
//                 body: reminder.reminderMsg,
//                 from: "whatsapp:+14155238886",
//                 to: "whatsapp:+918547256170"
//               })
//               .then((message) => console.log(message.sid));
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, 1000);
setInterval(async () => {
  try {
    const reminderList = await Remindermodel.find({}).exec();
    if (reminderList) {
      reminderList.forEach(async (reminder) => {
        if (!reminder.isReminded) {
          const now = new Date();
          const [reminderHour, reminderMinute] = reminder.reminderAt.split(":").map(Number);
          const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), reminderHour, reminderMinute);

          if (reminderTime - now < 0) {
            await Remindermodel.findByIdAndUpdate(reminder._id, { isReminded: true }).exec();

            const accountSid = "AC06591a33714074af78e52d971b9f6ec3";
            const authToken = "d7657473aa4742b62e34ce7198c1b664";
            const client = require("twilio")(accountSid, authToken);

            client.messages
              .create({
                body: reminder.reminderMsg,
                from: "whatsapp:+14155238886",
                to: "whatsapp:+918547256170"
              })
              .then((message) => console.log(message.sid));
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}, 1000);




    
app.post('/signup',async(req,res)=>{
  try {
    const data = req.body;
    console.log({ data });

    const newuser = new Usermodel(data);
    await newuser.save();
    res.redirect('/profile');
  } catch (error) {
    console.error('An error occurred while signing up:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async(req, res) => {
  const {username, password} = req.body;

  console.log('Received request:', username, password);

  const user = await Usermodel.findOne({username: username,password: password});
  if(user){
    console.log(user);
    return res.json({status:"ok",data:user});
    
  }
  else{
    console.log("user not found");
    return res.json({status:"error"});
  }

  });
  app.get("/getAllReminder", async (req, res) => {
    try {
      const reminderList = await Remindermodel.find({}).exec();
      res.send(reminderList);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching reminders.");
    }
  });
  
  
  
    app.post("/addReminder", async (req, res) => {
      try {
        const { reminderMsg, reminderAt } = req.body;
        const reminder = new Remindermodel({
          reminderMsg,
          reminderAt,
          isReminded: false,
        });
    
        await reminder.save();
    
        const reminderList = await Remindermodel.find({});
        res.send(reminderList);
      } catch (error) {
        console.error("An error occurred while adding a reminder:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    

  app.post("/deleteReminder",(req,res)=>{
    Remindermodel.deleteOne({_id:req.body.id},()=>{
      Remindermodel.find({},(err,reminderList)=>{
        if(err){
          console.log(err)
        }
        if(reminderList){
          res.send(reminderList)
        }
      })

    })
  })
  

app.listen(3002, () => {
  console.log('Server started on port 3005');
});
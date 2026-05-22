const express =require('express');
const http=require('http');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();

const socketServer=require("./socketServer.js");

const authRouter=require("./routes/authRoute.js");
const friendInvitationRouter=require("./routes/friendInvitationRoute.js");

const Port=process.env.Port || process.env.API_Port;
const app=express();
app.use(express.json());
app.use(cors());
const server=http.createServer(app);
socketServer.registerSocketServer(server);

mongoose.connect(process.env.mongo_url)
.then(() => {
    console.log("mongo connected");

    server.listen(Port, () => {
        console.log("him");
    });
})
.catch((error) => console.log("mongoo faild to connect"));


//register the routes
app.use("/api/auth",authRouter);
app.use("/api/friend-invitation",friendInvitationRouter);

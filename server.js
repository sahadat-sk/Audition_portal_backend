const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const { sequelize } = require("./models");
const errorHandler = require("./middlewares/errorHandler");
const cluster = require("node:cluster");
const numCPUs = require("node:os").cpus().length;
const verifyJWT = require("./middlewares/verifyJWT")
const verifyRoles = require("./middlewares/verifyRoles")
// const process = require("node:process");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));

app.use(verifyJWT);
app.use(verifyRoles("su"));
app.use("/protected",require("./routes/superUser"))


app.all("*", (req, res) => {
    res.sendStatus(404);
});

app.use(errorHandler);

// for multithreading

// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);

//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on("exit", (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//         cluster.fork();
//     });
// } else {
//     app.listen(PORT, async () => {
//         try {
//             await sequelize.sync();
//             console.log(`server running on port ${PORT}`);
//         } catch (err) {
//             console.error(err);
//         }
//     });
//     console.log(`Worker ${process.pid} started`);
// }

app.listen(PORT, async()=>{
    try{
        await sequelize.sync();
        console.log(`server running on port ${PORT}`)
    }catch(err){
        console.error(err);
    }
})

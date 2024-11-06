import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post("/signin", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({id:1}, JWT_SECRET);
    res.cookie("token",token);
    res.send("Logged In");
})

app.get("/user", (req,res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    res.send({
        userId: decoded.id;
    })
});

app.post("/logout", (req,res) => {
    res.cookie("token","/");
    res.json({
        msg: "Logged Out"
    })
})

app.listen(3000);
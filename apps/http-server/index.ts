import express from "express"
import { prismaClient } from "db/client";
const app=express();
app.use(express.json())

app.get("/users",async(req,res)=>{
    const users=await prismaClient.user.findMany();
    if(!users){
        res.status(500).json({
            error:"Unable to find users"
        })
        return;
    }
    res.status(200).json({
        users:users
    })
})

app.post("/user",async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.status(400).json({
            error:"Username and password required"
        })
        return;
    }
    const user= await prismaClient.user.create({
        data:{
            username,
            password
        }
    })
    if(!user){
        res.status(403).json({
            error:"Unable to create user"
        })
        return;
    }
    res.status(200).json({
        message:"User create successfully"
    })
})

app.listen(8080)
const express=require('express');
const cors=require('cors');
const Todo=require('../server/model');
require('dotenv').config();
const connectdb=require('../server/config/db');
connectdb();

const app=express();

const PORT= process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get('/',async(req,resp)=>{
    let result=await Todo.find();
    if(result.length>0)
    {
        resp.send(result)
    }
    else{
        resp.send({result:'no item found'})
    }
});

app.post('/add',async(req,resp)=>{
    let item=new Todo(req.body);
    let result=await item.save();
    resp.send(result);
})

app.delete('/delete/:id',async(req,resp)=>{
    let deleteItem=await Todo.findByIdAndDelete(req.params.id);
    resp.send(deleteItem)
})


app.listen(PORT,()=>console.log( "server is connected "+PORT))